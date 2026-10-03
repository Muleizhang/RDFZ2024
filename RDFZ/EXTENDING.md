# 内容扩展接口

游戏内容通过全局 `RDFZ` 注册表加载，存档由 `RDFZDB` 管理。新增内容无需修改战斗引擎。

## 新角色

在 `game.js` 加载后执行：

```js
RDFZ.registerHero({
  id: 'new_hero',
  name: '新角色',
  rank: 'A',
  pos: 3,
  role: '输出',
  hp: 12000,
  atk: 1800,
  def: 100,
  c: ['#3355aa', '#101b42'],
  trait: '角色特性',
  skills: [
    ['技能一', 3, '技能描述', 'single', 2.5],
    ['技能二', 5, '技能描述', 'aoe', 2],
    ['必杀技', 8, '技能描述', 'single', 6]
  ]
});
```

## 新关卡

```js
RDFZ.registerStage({
  id: 'stage-5',
  chapter: 5,
  name: '新关卡',
  enemyScale: 1.9,
  rewards: { gems: 500 }
});
```

## 新剧情

```js
RDFZ.registerStory({
  id: 'story-5-1',
  chapter: 5,
  title: '新的故事',
  summary: '剧情列表中的摘要',
  lines: ['第一句对白', '第二句对白']
});
```

## 新卡池

```js
RDFZ.registerPool({
  id: 'event-pool',
  name: '限定招募',
  costOne: 300,
  costTen: 2700,
  pity: 30,
  rates: { S: 0.06, A: 0.30, B: 0.64 }
});
```

## 事件接口

```js
RDFZ.on('summon', event => console.log(event.detail));
RDFZ.on('stageComplete', event => console.log(event.detail));
```

## 存档数据库

IndexedDB 数据库名：`rdfz-game-db`。

数据仓库：

- `profile`：账号等级、章节、召唤石和保底
- `stages`：关卡进度及首通记录
- `roster`：已拥有伙伴和当前阵容
- `inventory`：背包资源与伙伴碎片
- `storyFlags`：已阅读剧情

可通过 `await RDFZDB.exportSave()` 导出结构化存档对象。
