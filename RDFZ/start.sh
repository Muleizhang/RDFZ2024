#!/usr/bin/env bash
set -euo pipefail

if command -v conda >/dev/null 2>&1; then
  eval "$(conda shell.bash hook)"
  conda activate data_mining
elif [[ -x /root/miniconda3/bin/conda ]]; then
  eval "$(/root/miniconda3/bin/conda shell.bash hook)"
  conda activate data_mining
elif [[ -x /root/anaconda3/bin/conda ]]; then
  eval "$(/root/anaconda3/bin/conda shell.bash hook)"
  conda activate data_mining
else
  echo "提示：未找到 Conda，暂时使用系统 Python。"
fi

cd "$(dirname "$0")"
python -m http.server 4173
