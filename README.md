# RDFZ2024

网页游戏与原创原声《回声与晨光》。本分支包含网页资源优化，以及 **19首BGM、6段短音乐** 的谱面、静态音频和游戏接入。

## 配乐制作

三个原创主题（校园与伙伴、AI侵蚀、抵抗与希望）→ 逐曲乐谱与MIDI → 本地FluidSynth采样渲染 → 分轨混音 → 循环与编码验证 → 按场景加载。

先制作并修改主页、探索、战斗三首代表曲，再完成整套配乐。采用免费的Salamander钢琴与GeneralUser GS音源；不使用音乐API、额外云端模型或GPU。**未进行主观听觉验证**，技术测试不代表审美验收。

## 文档

- [制作规范与主题体系](RDFZ/music/music-bible.md)
- [本地重建、工具依赖与原声预览](RDFZ/music/README.md)
- [交付内容、测试结果及限制](RDFZ/music/reports/delivery-report.md)
- [代表曲修改记录](RDFZ/music/reviews/representatives-v2.md) · [整套谱面复核](RDFZ/music/reviews/album-review.md)
- [逐曲谱面、MIDI与MusicXML](RDFZ/music/scores/) · [真实场景映射](RDFZ/music/scene-mapping.json)

Git包含压缩网页音频与可编辑乐谱；大型音源、分轨、母带及缓存保留在本地工作目录，可按文档重建，不进入网页部署。

## 运行与构建

```bash
python -m http.server 4173 --directory RDFZ
node RDFZ/tools/build_web.mjs
# 已初始化音源与依赖后，离线增量重建整套配乐：
python RDFZ/tools/music/pipeline.py all --offline --resume
```

Vercel项目根目录设为 `RDFZ`，使用其中的 `vercel.json`。本次接入网页版本，未重新打包EXE/APK或同步独立旧版 `RDFZ-Mobile/www`。
