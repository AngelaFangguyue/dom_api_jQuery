window.jQuery = function(se) {
  //新建一个创建元素的函数createElement
  function createElement(stri) {
    let tmp = document.createElement("template");
    tmp.innerHTML = stri.trim(); //去除空格
    return tmp.content.firstChild; //获取创建的子元素
  }

  let elements;
  if (typeof se === "string") {
    if (se[0] === "<") {
      elements = [createElement(se)]; //这里涉及到了函数声明提前
    } else {
      elements = document.querySelectorAll(se);
    }
  } else if (se instanceof Array) {
    elements = se;
  }
  /////////////////////////////////////
  //不再使用api了。直接返回对象
  // let api = {
  //   //1:each函数遍历循环elements，这里使用到了闭包
  //   // each(fn){//
  //   //   for(let q=0;q<elements.length;q++){
  //   //     console.log(elements[q]);
  //   //     fn.call(null,elements[q],q);
  //   //   }
  //   // },
  //   //添加class，这里1用到了闭包，使用到了外面的elements变量
  //   addClass(clsn) {
  //     for (let q = 0; q < elements.length; q++) {
  //       elements[q].classList.add(clsn);
  //     }
  //     //this.each((x)=>{x.classList.add(clsn)});//先不做测试
  //     //console.log("addClass内部，this", this === api);//结果为true
  //     //return api;//注意这里的api可以换做this
  //     return this;
  //   }
  // };
  // return api;
  /////////////////////////////////
  return {
    jquery: true,
    elements: elements,
    oldApi: se.oldApi,
    get(x) {
      return elements[x];
    },
    ////////////////////////
    addClass(clsn) {
      for (let q = 0; q < elements.length; q++) {
        elements[q].classList.add(clsn);
      }
      return this;
    },
    //find函数
    find(sel) {
      let res = [];
      for (let w = 0; w < elements.length; w++) {
        let res1 = Array.from(elements[w].querySelectorAll(sel));
        res = res.concat(res1);
      }

      //return res; //在这里不应该return res；res只是获取到的元素组成的数组，所以要思考返回什么，而且注意返回了之后，若想回到上一级,去操作上一级的elements，要怎么做？
      res.oldApi = this; //这里的this就是当前的api对象，现在将对象放在了数组res中，那么如何在新的对象中获取呢？下面返回的是新的api对象。在新对象中获取旧对象的方法：继续定义一个oldApi的属性，该属性对应了res.oldApi,其实不是res.api，而是se.api。因为下面是将res作为jQuery参数se传递进去的。而且这里面还需要对elements的获取重新进行判断选择。即传递的是个选择器，就直接在body中查找；传递的是个数组，elements就还是这个元素组成的数组。
      return jQuery(res);
    },
    //////////////////////////////////
    end() {
      return this.oldApi;
    },
    //////////////////////////////////
    parent() {
      let res = [];
      this.each(x => {
        let res1 = x.parentNode;
        if (res.indexOf(res1) === -1) {
          res.push(res1);
        }
      });
      res.oldApi = this;
      return jQuery(res); //这里没有添加上一级对象，返回的就是操作当前查找到的父元素数组的对象
    },
    childs() {
      let res = [];
      this.each(x => {
        let res1 = x.children;
        res.push(...res1);
      });
      res.oldApi = this;
      return jQuery(res);
    },
    ///////////////////////////////////
    append(child) {
      if (child instanceof Element) {
        // this.each((x)=>{
        //   x.appendChild(child);
        // });
        //这里默认只有一个父元素，即elements里只有一个元素
        this.get(0).appendChild(child);
      } else if (child instanceof HTMLCollection) {
        // this.each((x)=>{
        //   //x.appendChild(child);
        //   for(let i=0;i<child.length;i++){
        //     x.appendChild(child[i]);
        //   }
        // });
        for (let i = 0; i < child.length; i++) {
          this.get(0).appendChild(child[i]);
        }
      } else if (child.jquery === true) {
        child.each(x => {
          this.get(0).appendChild(x);
        });
      }
      return this;
    },
    appendTo(node) {
      //node只有一个元素
      if (node instanceof Element) {
        this.each(x => {
          node.appendChild(x);
        });
      } else if (node.jquery === true) {
        console.log("node.jquery === true");
        console.log(node.get(0));
        this.each(x => {
          node.get(0).appendChild(x);
        });
      }
      return this;
    },
    //////////////////////////////////
    //each函数是方便遍历循环当前的elements
    each(fn) {
      for (let y = 0; y < elements.length; y++) {
        fn.call(null, elements[y], y);
      }
      return this;
    },
    //////////////////////////////////
    //print方法是方便打出当前对象的elements
    print() {
      for (let e = 0; e < elements.length; e++) {
        console.log("第" + e + "个elements:", elements[e]);
      }
      return this; //参照addClass,return this返回的就是当前操作的对象
    }
  };
}; //定义一个jQuery函数，也就是一个对象，因为函数就是对象嘛。传递一个选择器，获取到这个选择器对应的元素数组；然后返回一个对象，这个对象提供了一些可以操作获取到的元素数组的api，也就是方法，函数。
window.$ = window.jQuery;
