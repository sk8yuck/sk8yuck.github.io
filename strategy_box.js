var StrategyBox = function(){
  this.strategies = [];
}

//添加策咯
//name:string:策略名称
//weight:numeric(0~):权重(默认权重1)
StrategyBox.prototype.addStrategy = function(name, weight, args) {
  if(!name||""==name.trim())
    throw "A strategy needs a name";

  var strategy = {
    name:name,
    weight:(weight?(weight>0?weight:0):1)
  };

  this.strategies.push($.extend(args?args:{}, strategy));

  return this;
};

//获取策略
//name:string:策略名称
StrategyBox.prototype.getStrategy = function(name) {
  var result = null;
  $.each(this.strategies,function(){
    if(name==this.name){
      result = this;
    }
  });
  return result;
};

//改变权重
//name:string:策略名称
//delta:numeric:增量
StrategyBox.prototype.changeWeight = function(name, delta) {
  var strategy = this.getStrategy(name);

  if((strategy.weight + delta)>0)
    strategy.weight += delta;
  else
    strategy.weight = 0;

  return this;
};

//设置权重
//name:string:策略名称
//weight:numeric(0~)权重值
StrategyBox.prototype.setWeightByName = function(name, weight) {
  var strategy = this.getStrategy(name);

  if(weight > 0)
    strategy.weight = weight;
  else
    strategy.weight = 0;

  return this;
};

//决策
//randomSeed:numeric(0~1):可选
StrategyBox.prototype.decide = function(randomSeed) {
  var calcArr = [];
  var weightArr = [];

  $.each(this.strategies,function(i,strategy){
    for(var j=0;j<strategy.weight*10;j++){
      weightArr.push(strategy.name);
    }
  });

  if(0==weightArr.length){
    $.each(this.strategies,function(i,strategy){
     weightArr.push(strategy.name);
     strategy.weight+=1;
    });
  }

  var weightIndex = Math.round((randomSeed?randomSeed:Math.random()) * weightArr.length);

  if(this.debug){
    console.log("Decision =>",weightArr[weightIndex]);
  }

  return this.getStrategy(weightArr[weightIndex]);
};
