let a = require("./a.js")
require('./index.css')
require('./index.less')
// require('@babel/polyfill') //实现一些不能实现的方法 Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
console.log(a)
let fn = () => {
    console.log('我是es6')
}
fn()
// @log
class Car{
    name(){
        console.log('我是BMW')
    }
}
let car = new Car()
car.name()
function* gen(){
  yield 1;
}
console.log(gen().next())

var pro =  new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
        console.log('执行完成');
        resolve('随便什么数据');
    }, 2000);
});
pro.then(() => {
    console.log('我是promise')
})
"aaa".includes('avvv')
console.log($)
console.log(DEV)