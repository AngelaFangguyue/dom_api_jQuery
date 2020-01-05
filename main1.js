console.log("hi");
let a = window.jQuery("#test1");
console.log(a);
let b = a.addClass("red");
console.log(b);
b.addClass("orange");
//console.log(a === b);//结果为true
let c = a.find(".chik");
console.log("外部main1c", c);
console.log(c.oldApi);
c.print();
c.oldApi.print();
console.log(c.end());
console.log(c.end().print());
let d = c.end().parent();
console.log("d", d);
d.print();
let e = d.childs();
console.log("e", e);
let f = e.end();
console.log(f);
f.print();
let tt = $(
  "<div id='ttt' style='background:pink;border:5px solid green;padding:20px;'></div>"
);
console.log(tt);

$("#test2").append(tt);
tt.appendTo(a); //一个元素不能出现在两个地方，即这个tt只能出现在最后添加的地方
