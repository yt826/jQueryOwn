window.jQuery = function(selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<')//传入的是一个标签，这是我们需要创建这个标签
        {
            elements = [createElement(selectorOrArrayOrTemplate)]
        }
        else   //传入的是一个选择器，查找这个标签     
        {
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
         }
    }
    else if (selectorOrArrayOrTemplate instanceof Array) {
        elements = selectorOrArrayOrTemplate
    }
    function createElement(string) {
       const container = document.createElement("template")
        container.innerHTML = string.trim()
        return container.content.firstChild
    }
    //api可以操作elements
    return api =
    {
        jquery: true,
        elements: elements,
        get(index)//获取指定下标的元素
        {
            return elements[index]
        },
        appendTo(node)//将API添加到指定父亲中
        {
            if (node instanceof Element) {
                this.each(el => node.appendChild(el))
            }
            else if (node.jquery === true) {
                this.each(el =>node.get[0].appendChild(el)) 
            }
        },
        append(children) //向API中添加一个孩子
        {
            if (children instanceof Element) {
                this.get(0).appendChild(children)
            }
            else if (children instanceof HTMLCollection) {
                for (let i = 0; i < children.length;i++){
                    this.get(0).appendChild(children[i])
                }
            }
            else if (children.jquery === true) {
                children.each(node=>this.get(0).appendChild(node))
            }
        },
        find(selector)//查找API中所有的selector元素
        {
            let array = []
            for (let i = 0; i < elements.length;i++){
                const elements2 = Array.from(elements[i].querySelectorAll(selector))
                //因为querySelectorAll返回的是一个伪数组，所以这里我们需要将它转化为数组
                array = array.concat(elements2)
            }
            array.oldApi = this                         //this是旧的Api
            return jQuery(array)
        },
        each(fn) {
            for (let i = 0; i < elements.length;i++)
            {
                fn.call(null,elements[i],i)
            }
            return this

        },
        parent() {
            const array =[]
            this.each(node => {
                if (array.indexOf(node.parentNode) === -1) {
                    array.push(node.parentNode)
                }
            }) 
            return jQuery(array)
        },
        children() {
            const array = []
            this.each((node)=> {
                array.push(...node.children)
            })
            return jQuery(array)
        },
        print() {
            console.log(elements);
        },
        addClass(className) {
            for (let i = 0; i < elements.length; i++){
                const element = elements[i]
                element.classList.add(className)
            }
            return this
        },
        oldApi: selectorOrArrayOrTemplate.oldApi,
        end() {
            return this.oldApi
        },
    }
}
window.$ = window.jQuery
