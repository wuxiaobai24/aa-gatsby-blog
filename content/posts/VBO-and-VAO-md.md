---
title: VBO_and_VAO.md
date: 2017-10-01T16:37:52.000Z
tags:
  - OpenGL
  - note
  - 计算机图形学
---
最近在写计算机图形学的期中作业，写一个简易的俄罗斯方块。在写的过程中感觉好像之前暑假看的`OpenGL`的东西都忘光光了，所以还是及时的写写笔记吧！

> 顶点数组对象： Vertex Array Object,vao
>
> 顶点缓冲对象：Vertex Buffer Object,vbo

在敲代码的时候就觉得老是会搞混这两个概念，所以今天就总结一下。

先来段代码：

```c++
void init() {
    const int VERTICES_NUM = 3;
    vec3 vertices[VERTICES_NUM] = {
        {1.0,1.0,1.0},
        {0.0,1.0,0.0},
        {0.0,0.0,1.0}
    }

    GLuint vao[1];
    glGenVertexArrays(1,vao);
    glBindVertexArray(vao[0]);

    GLuint buffer;
    glGenBuffers(1,&buffer);
    glBindBuffer(GL_ARRAY_BUFFER, buffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices),vertices,CL_STATIC_DRAW);

    GLuint program = InitShader("vshader.glsl","fshader.glsl");
    glUseProgram(program);

    GLuint location = glGetAttribLocation(program,"vPosition");
    glEnableVertexAttribArray(location);
    glVertexAttribPointer(location,3,GL_FLOAT,GL_FALSE,0,BUFFER_OFFSET(0));

    glClearColor(1.0,1.0,1.0,1.0);
}
```

OpenGL里的对象都是通过`id`来管理的,有的地方叫做名字，或者说标识符，whatever,我们在这里统一用id。我们需要用`glGen*`模式的函数来获取未使用的id，这里的id可以想成是指针。

```c++
GLuint vao[1];                  //用来存放id的数组
glGenVertexArrays(1,vao);       //获取id，第一个参数是想要获取的个数
                                //第二个参数是存放这些id的数组
```

现在我们有了顶点数组对象的`id`了（换句话说，我们有了一个可以存放地址的指针），我们就需要真正的`new`一个对象出来。

```c++
glBindVertexArray(vao);
```

- 如果vao非0，并且是`glGenVertexArrays()`返回的，那么它创建一个新的顶点数组，并且==并且与其名称向关联==
- 如果vao已经被绑定到一个顶点数组对象中，那么这个函数的作用就是激活这个顶点数组。
- 如果为0，那么OpenGL将不再使用程序所分配的顶点数组对象，并且OpenGL状态将重设为顶点数组的默认状态。

第一个很好理解就是等价于`new`,第二个作用可以理解为根据`id`获取对象（对指针解引用），第三个作用是在每次对某个顶点数组对象操作完后对当前顶点数组对象进行解绑。

有`new`就会有`delete`

```c++
//void glDeleteVertexArray(GLsizei n,GLuint *arrays);
glDeleteVertexArray(1,vao);
```

我们还可以判断一个`id`是否是一个用`glGenVertexArray()`创建并且没有被删除的顶点数组对象的`id`:

```c++
GLboolean glIsVertexArray(GLuint array);
```

现在我们已经有一个vao了，但是我们好像还不知道vao有什么用，要回答这个问题，我们还需要一些其他的背景知识，所以这个问题放到后面再回答。

我们之所以需要VAO与VBO是因为我们想要把某些顶点数组发送给图像渲染pipeline，而pipleline需要接受一些Vertex Data,然后再进行一些变换或修改并渲染。

![](https://learnopengl-cn.github.io/img/01/04/pipeline.png)

我们在定义了顶点数据之后，我们需要把他发送给顶点着色器，我们的顶点数据通常是放在GPU的内存中的，我们利用顶点缓冲对象(vertext buffer objects,vbo)进行管理

vbo也有相应的函数进行申请`id`，绑定等等，与vao类似：

```c++
void glGenBuffers(GLsizei n,GLuint *buffers);
void glBindBuffers(GLenum traget,GLuint buffer);
//target 的值可以为：
//      GL_ARRAY_BUFFER
//      GL_ELEMENT_ARRAY_BUFFER
//      ...
void glDeleteBuffers(GLsizei n,const GLuint *buffers);
GLboolean glIsBuffers(GLuint buffer);
```

在申请完`id`并绑定后，我们可以想GPU的内存发送数组:

```c++
void glBufferData(GLenum target,GLsizeiptr size,cons GLvoid *data,GLenum usage);
//target 与上面glBindBuffers的类似，
//usage 是设置读取和写入的方式
//      GL_STREAM_DRAM
//      GL_DYNAMICDRAM
//      ...
```

在我们向GPU内存中发送完数据后，我们可能需要告诉OpenGL如何解释我们的数据:

```c++
GLuint location = glGetAttribLocation(program,"vPosition");
glEnableVertexAttribArray(location);
glVertexAttribPointer(location,3,GL_FLOAT,GL_FALSE,0,BUFFER_OFFSET(0));
```

我们先要向着色器程序获取顶点属性的位置值，即`GLuint location = glGetAttribLocation(program,"vPosition");`我们应该可以在`vshader.glsl`中看到这样一句话`in vec3 vPosition`,他表示的是我们会给他一个类型为vec3的输入值，而`glGetAttribLocation`可以获取这个输入值的位置，这样我们才可以把我们的数据和这里的`vPosition`绑定起来。

`glEnableVertexAttribArray(location)`启用顶点属性（默认是禁用的)

而`glVertexAttribPointer(location,3,GL_FLOAT,GL_FALSE,0,BUFFER_OFFSET(0));`才是真正告诉OpenGL如何解释的函数。

他的参数解释分别为：

- 顶点属性的位置值
- 顶点属性大小，因为我们传入的是`vec3`,所以是3
- 数组类型
- 是否归一化
- 两个元素之间的偏移值
- 起始位置地址

有了这些东西，我们就可以绘制某个物体了，但是如果我们需要绘制多个物体呢，这时VAO的作用就出来了。

如果我们只使用VBO，我们可能需要重复的调用`glVertexAttribPointer`等。

我们可以通过VAO来管理这些琐碎的设置，一个VAO会存储以下内容：

- `glEnableVertexAttribArray`和`glDisableVertexAttribArray`的调用。
- 通过`glVertexAttribPointer`设置的顶点属性配置。
- 通过`glVertexAttribPointer`调用与顶点属性关联的顶点缓冲对象。

有了vao后，我们只需要在每次绘制前`glBindVertexArray(vao)`即可。