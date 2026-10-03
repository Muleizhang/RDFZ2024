(function(global){
  const stores={heroes:new Map(),stages:new Map(),stories:new Map(),pools:new Map()};
  const register=(type,item)=>{if(!item?.id)throw new Error(`${type} content requires an id`);stores[type].set(item.id,Object.freeze({...item}));return item};
  global.RDFZ={
    version:'2.0.0',
    registerHero:item=>register('heroes',item),
    registerStage:item=>register('stages',item),
    registerStory:item=>register('stories',item),
    registerPool:item=>register('pools',item),
    getHero:id=>stores.heroes.get(id),
    getStage:id=>stores.stages.get(id),
    getStory:id=>stores.stories.get(id),
    getPool:id=>stores.pools.get(id),
    list:type=>[...(stores[type]?.values()||[])],
    on:(name,handler)=>addEventListener(`rdfz:${name}`,handler),
    emit:(name,detail)=>dispatchEvent(new CustomEvent(`rdfz:${name}`,{detail})),
    extensionExample:{
      hero:{id:'new_hero',name:'新角色',rank:'A',pos:3,role:'输出',hp:12000,atk:1800,skills:[]},
      stage:{id:'chapter-2-1',chapter:2,name:'新的关卡',enemyScale:1.5,rewards:{gems:200}},
      story:{id:'story-2-1',title:'新的故事',lines:['对白一','对白二']}
    }
  };
})(window);
