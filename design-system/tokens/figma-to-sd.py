#!/usr/bin/env python3
"""
figma-to-sd.py
Transforma JSON exportados desde Figma (Variables API format)
al formato Style Dictionary v4.

Lee:     source/raw/{collection}.json
Escribe: source/{collection}.json

Formatos soportados:
  - Figma Variables API: { id, name, modes, variables: [...] }
  - DTCG legacy:         { "collection": { modes: { "Mode 1": {...} } } }
  - Array DTCG:          [ { "collection": { modes: {...} } }, ... ]
"""

import json
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
RAW_DIR    = SCRIPT_DIR / 'source' / 'raw'
OUT_DIR    = SCRIPT_DIR / 'source'

# ── Agregar 'atlas' activa el pipeline para la colección cartográfica ──────────
COLLECTIONS = ['numbers', 'primitivos', 'semanticos', 'componentes', 'atlas']

TYPE_MAP = {
    'FLOAT':   'float',
    'STRING':  'string',
    'BOOLEAN': 'boolean',
    'COLOR':   'color',
}

FIGMA_META = {'$scopes', '$libraryName', '$collectionName'}


# ─── Color conversion ─────────────────────────────────────────────────────────

def rgba_to_css(r, g, b, a):
    """Convierte r/g/b/a (0–1) a string CSS preservando precisión completa."""
    R = round(r * 255)
    G = round(g * 255)
    B = round(b * 255)
    if a >= 1.0:
        return f'#{R:02x}{G:02x}{B:02x}'
    # Preservar hasta 4 decimales significativos, sin ceros finales
    a_str = f'{a:.4f}'.rstrip('0').rstrip('.')
    return f'rgba({R}, {G}, {B}, {a_str})'


def color_token(r, g, b, a):
    """
    Retorna { $type, $value } para un color.
    Colores con alpha < 1 usan $type: string para evitar que
    Style Dictionary pierda precisión en alphas pequeños.
    """
    css = rgba_to_css(r, g, b, a)
    typ = 'color' if a >= 1.0 else 'string'
    return {'$type': typ, '$value': css}


# ─── Nested dict builder ──────────────────────────────────────────────────────

def set_nested(d, path, value):
    """Inserta value en d siguiendo la lista de keys en path."""
    for key in path[:-1]:
        if key not in d or not isinstance(d[key], dict):
            d[key] = {}
        d = d[key]
    last = path[-1]
    if last in d and isinstance(d[last], dict) and '$value' not in d[last]:
        d[last].update(value)
    else:
        d[last] = value


def count_tokens(node):
    if not isinstance(node, dict):
        return 0
    if '$value' in node:
        return 1
    return sum(count_tokens(v) for v in node.values())


# ─── Parsers ──────────────────────────────────────────────────────────────────

def parse_raw_value(raw_val, vtype, res_by_mode, mode_id):
    """Convierte un valor concreto (no alias) a token SD."""
    if vtype == 'COLOR':
        if isinstance(raw_val, dict) and 'r' in raw_val:
            r, g, b, a = raw_val['r'], raw_val['g'], raw_val['b'], raw_val.get('a', 1.0)
        else:
            resolved = res_by_mode.get(mode_id, {}).get('resolvedValue', {})
            r = resolved.get('r', 0)
            g = resolved.get('g', 0)
            b = resolved.get('b', 0)
            a = resolved.get('a', 1.0)
        return color_token(r, g, b, a)

    if vtype == 'FLOAT':
        return {'$type': 'float', '$value': raw_val}

    if vtype == 'STRING':
        return {'$type': 'string', '$value': str(raw_val)}

    return {'$type': 'string', '$value': str(raw_val)}


def parse_figma_api(data):
    """
    Parsea el formato Figma Variables API:
    { id, name, modes: { modeId: modeName }, variables: [...] }
    """
    modes   = data['modes']
    mode_id = next(iter(modes))
    result  = {}

    for var in data['variables']:
        name        = var['name']
        vtype       = var['type']
        val_by_mode = var.get('valuesByMode', {})
        res_by_mode = var.get('resolvedValuesByMode', {})

        if mode_id not in val_by_mode:
            continue

        raw_val = val_by_mode[mode_id]

        if isinstance(raw_val, dict) and raw_val.get('type') == 'VARIABLE_ALIAS':
            resolved   = res_by_mode.get(mode_id, {})
            alias_name = resolved.get('aliasName', '')

            if alias_name:
                sd_ref = '{' + alias_name.replace('/', '.') + '}'
                sd_type = TYPE_MAP.get(vtype, 'string')
                if vtype == 'COLOR':
                    resolved_val = resolved.get('resolvedValue', {})
                    a = resolved_val.get('a', 1.0) if isinstance(resolved_val, dict) else 1.0
                    sd_type = 'color' if a >= 1.0 else 'string'
                token = {'$type': sd_type, '$value': sd_ref}
            else:
                token = parse_raw_value(raw_val, vtype, res_by_mode, mode_id)
        else:
            token = parse_raw_value(raw_val, vtype, res_by_mode, mode_id)

        path = name.split('/')
        set_nested(result, path, token)

    return result


def strip_meta(node):
    if not isinstance(node, dict):
        return node
    return {k: strip_meta(v) for k, v in node.items() if k not in FIGMA_META}


def parse_dtcg(data, name):
    """Parsea formato DTCG legacy (array o objeto con wrapper de colección)."""
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict) and name in item:
                data = item[name]
                break
        else:
            if data and isinstance(data[0], dict):
                data = next(iter(data[0].values()))

    if isinstance(data, dict):
        if name in data:
            data = data[name]
        if 'modes' in data:
            first_mode = next(iter(data['modes'].values()))
            return strip_meta(first_mode)

    return strip_meta(data)


def load_and_parse(path, name):
    """Detecta el formato y parsea el archivo raw."""
    with open(path, encoding='utf-8') as f:
        data = json.load(f)

    # Formato Figma Variables API
    if isinstance(data, dict) and 'variables' in data and 'modes' in data:
        return parse_figma_api(data)

    # Formato DTCG
    return parse_dtcg(data, name)


# ─── Transformaciones por colección ──────────────────────────────────────────

def transform_primitivos(tokens):
    """
    Renombra border → border-width para evitar colisión de namespace
    con la clave 'border' (colores semánticos) de semanticos.json.
    """
    if 'border' in tokens and 'border-width' not in tokens:
        tokens['border-width'] = tokens.pop('border')
    return tokens


def transform_numbers(tokens):
    """
    Agrupa xs/sm/md/lg/xl/2xl/3xl/4xl bajo 'scale' para que no
    contaminen el namespace global de Style Dictionary.
    """
    SCALE_KEYS = {'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'}
    scale, rest = {}, {}
    for k, v in tokens.items():
        if k in SCALE_KEYS and isinstance(v, dict) and '$value' in v:
            scale[k] = v
        else:
            rest[k] = v
    if scale:
        rest['scale'] = scale
    return rest


def transform_semanticos(tokens):
    """
    Elimina focus.ring.color — genera el mismo CSS var que focus.ring-color
    causando colisión de namespace en Style Dictionary.
    Se conserva focus.ring-color como fuente de verdad.
    """
    if 'focus' in tokens and 'ring' in tokens['focus']:
        tokens['focus']['ring'].pop('color', None)
    return tokens


def transform_atlas(tokens):
    """
    Sin transformaciones estructurales necesarias por ahora.
    Los tokens de concesion/* y mapa/* llegan limpios desde Figma.
    Extender aquí si en el futuro se necesita renombrar algún grupo.
    """
    return tokens


TRANSFORMS = {
    'primitivos': transform_primitivos,
    'numbers':    transform_numbers,
    'semanticos': transform_semanticos,
    'atlas':      transform_atlas,
}


# ─── Main ─────────────────────────────────────────────────────────────────────

def main():
    if not RAW_DIR.exists():
        print('✗ No existe source/raw/')
        print('  Crea la carpeta y coloca los JSON exportados de Figma.')
        sys.exit(1)

    print('Figma → Style Dictionary\n')

    # Cargar todos los archivos disponibles
    loaded = {}
    for name in COLLECTIONS:
        path = RAW_DIR / f'{name}.json'
        if not path.exists():
            continue
        try:
            tokens = load_and_parse(path, name)
            loaded[name] = tokens
        except Exception as e:
            print(f'✗ Error en {name}.json: {e}')
            sys.exit(1)

    if not loaded:
        print('✗ No se encontraron archivos en source/raw/')
        print(f'  Esperados: {", ".join(f"{n}.json" for n in COLLECTIONS)}')
        sys.exit(1)

    total_raw = sum(count_tokens(t) for t in loaded.values())
    print(f'✓ Mapa de IDs construido: {total_raw} variables\n')

    # Procesar y escribir
    grand_total = 0
    for name in COLLECTIONS:
        if name not in loaded:
            print(f'⚠  source/raw/{name}.json no encontrado — saltando')
            continue

        tokens = loaded[name]

        if name in TRANSFORMS:
            tokens = TRANSFORMS[name](tokens)

        n = count_tokens(tokens)
        grand_total += n

        out = OUT_DIR / f'{name}.json'
        with open(out, 'w', encoding='utf-8') as f:
            json.dump(tokens, f, indent=2, ensure_ascii=False)
            f.write('\n')

        print(f'✓ {name}.json → source/{name}.json ({n} tokens)')

    print(f'\n✓ Total: {grand_total} tokens procesados')
    print('  Ejecuta: npm run build')


if __name__ == '__main__':
    main()