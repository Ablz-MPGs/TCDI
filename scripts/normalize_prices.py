import json
import re
from pathlib import Path

path = Path('data/dinoDataBase.json')
obj = json.loads(path.read_text(encoding='utf-8'))
pattern = re.compile(r'^\D*([0-9\.]+)\D*$')
changed = []
for dino, data in obj.items():
    stats = data.get('stats', {})
    for key in ['price', 'skin1', 'skin2', 'fotinha', 'cormoeda', 'corgema']:
        if key in stats and isinstance(stats[key], str):
            value = stats[key]
            if value in ('N/A', '-', 'free'):
                continue
            if value.isdigit():
                continue
            m = pattern.match(value)
            if m:
                new = m.group(1).replace('.', '')
                if new != value:
                    stats[key] = new
                    changed.append((dino, key, value, new))

if changed:
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False), encoding='utf-8')
    print('Updated', len(changed), 'fields')
    for c in changed[:50]:
        print(c)
else:
    print('No changes made')
