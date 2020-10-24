# 第二天
##  递归
在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数。
阶乘： n的阶乘为n * (n-1) *  (n-2) * ... * 1

````
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n-1)

if __name__ == "__main__":
    print(factorial(5))
````

使用递归函数的优点是逻辑简单清晰，缺点是过深的调用会导致栈溢出。
````
def test():
    return test()
if __name__ == "__main__":
    test()
````
RecursionError: maximum recursion depth exceeded 递归异常，超过最大递归深度
查看递归最大次数
```
>>> import sys
>>> sys.getrecursionlimit()
```

x的n次幂 等于x 的n-1次幂乘x，x的0次幂等于1
````
def power(x, n):
    if n == 0:
        return 1
    else:
        return x * power(x, n -1)
if __name__ == "__main__":
    print(power(2, 6))
````

练习：取出n层嵌套列表里的所有元素
提示判断一个元素i是否是list 使用isinstance(i,list)函数
[1,2,3,[4,5,6]]  1 2 3 4 5 6



## 装饰器


装饰器是可调用的对象，其参数是另一个函数（被装饰的函数），装饰器可以处理被装饰的函数，然后把它返回一个函数

将targett的替换为inner
````
def deco(func):
    def inner():
        print("running inner()")
    return inner

@deco
def target():
    print('running target()')


if __name__ == "__main__":
    target()

````
等效
````
def deco(func):
    def inner():
        print("running inner()")
    return inner


def target():
    print('running target()')


if __name__ == "__main__":
    target = deco(target)
    target()

````


它可以让被装饰的函数在不需要做任何代码变动的前提下增加额外的功能，
被装饰的函数当作参数传入，装饰器返回经过修饰后函数的名字；
内层函数（闭包）负责修饰被修饰函数。从上面这段描述中我们需要记住装饰器的几点属性，以便后面能更好的理解

+ 实质： 是一个函数
+ 参数：被装饰函数名
+ 返回：返回一个函数
+ 作用：为已经存在的对象添加额外的功能

统计函数的执行时间
````
import time

def decorator(func):
    def wrapper():
        start_time = time.time()
        func()
        end_time = time.time()
        print(end_time - start_time)

    return wrapper

@decorator
def func():
    print("hello world")
    time.sleep(1)

func()
````

调用被装饰函数时,参数传递给返回的函数，所以wrap的参数要与被装饰函数一致，或者写成wrap(*arg, **dict)
````
def add_decorator(f):
    def wrap(x,y):
        print("加法")
        return f(x,y)
    return wrap

@add_decorator
def add_method(x, y):
    return x + y


print(add_method(2,3))
````

带参数的装饰器，本质是一个返回装饰器的函数
````
def out_f(arg):
    print("out_f" + arg)
    def decorator(func):
        def inner():
            func()
        return inner
    return decorator

@out_f("123")
def func():
    print("hello word")


func()
````
参数123传给函数out_f  返回装饰器decorator，@out_f("123")  就是@decorator

## 可迭代的对象，迭代器
迭代的意思是重复做一些事很多次，for循环就是一种迭代，列表，字典，元组都是可迭代对象
实现__iter__方法的对象都是可迭代的对象。 __iter__ 返回一个迭代器，所谓迭代器就是具有next方法的对象
在掉用next方法的时，迭代器会返回它的下一个值，如果没有值了，则返回StopIteration
````
>>> l = [1,2,3]   # l为可迭代对象
>>> b = l.__iter__()    #b 为迭代器
>>> next(b)
1
>>> next(b)
2
>>> next(b)
3
>>> next(b)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
````
使用类定义迭代器，斐波那契数

````
class Fibs:
    def __init__(self):
        self.a = 0
        self.b = 1

    def __next__(self):
        self.a, self.b = self.b, self.a + self.b
        return self.a

    def __iter__(self):
        return self


fibs =Fibs()

for f in fibs:
    if f > 1000:
        print(f)
        break
````

## 生成器
1. 生成器函数
生成器是一种用函数语法定义的迭代器; 调用生成器函数返回一个迭代器
yield语句挂起生成器函数并向调用者发送一个值，迭代器的_next__继续运行函数

````
L = [[1, 2],[3, 4],[5,]]
def flat(L):
    for sublist in L:
        for e in sublist:
            yield e

for num in flat(L):
    print(num)
````

2. 生成器表达式
````
>>> f = ( x ** 2 for x in range(4))
>>> next(f)
0
>>> next(f)
1
>>> next(f)
4
>>> next(f)
9
````

##  序列化

### json

### pickle
pickle模块是一种的对象序列化工具；对于内存中几乎任何的python对象，都能把对象转化为字节串，
这个字节串可以随后用来在内存中重建最初的对象。pickle模块能够处理我们用的任何对象，列表，字典
嵌套组合以及类和实例

#### 1. dumps和 loads
列表对象
````
>>> import pickle
>>> l = [1,2,3]
>>> pickle.dumps(l)
b'\x80\x03]q\x00(K\x01K\x02K\x03e.'
>>> b = pickle.dumps(l)
>>> b
b'\x80\x03]q\x00(K\x01K\x02K\x03e.'
>>> pickle.loads(b)
````

字典对象
````
>>> d = {"id":1, "name": "贾敏强", "phone_number":"15801396646"}
>>> pickle.dumps(d)
b'\x80\x03}q\x00(X\x02\x00\x00\x00idq\x01K\x01X\x04\x00\x00\x00nameq\x02X\t\x00\x00\x00\xe8\xb4\xbe\xe6\x95\x8f\xe5\xbc\xbaq\x03X\x0c\x00\x00\x00phone_numberq\x04X\x0b\x00\x00\x0015801396646q\x05u.'
>>> b = pickle.dumps(d)
>>> pickle.loads(b)
{'id': 1, 'name': '贾敏强', 'phone_number': '15801396646'}
````

类和实例
````
import pickle


class Record:
    def __init__(self, name, phone_number):
        self.name = name
        self.phone_number = phone_number


R = pickle.dumps(Record)
print(R)
print(pickle.loads(R))

record = Record("贾敏强", "15801396646")
r = pickle.dumps(record)
print(r)
print(pickle.loads(r))
````

#### 2. dump 和load
````
import pickle

L = [1, 2, 3]
with open("d://L.dat", "wb") as f:
    pickle.dump(L, f)
with open("d://L.dat", "rb") as f:
    print(pickle.load(f))


class Record:
    def __init__(self, name, phone_number):
        self.name = name
        self.phone_number = phone_number


with open("d:/Record.dat", "wb") as f:
    pickle.dump(Record, f)
with open("d:/Record.dat", "rb") as f:
    print(pickle.load(f))

record = Record("贾敏强", "15801396646")
with open("d:/record.dat", "wb") as f:
    pickle.dump(record, f)
with open("d:/record.dat", "rb") as f:
    print(pickle.load(f))


records = []
records.append(record)
with open("d:/records.dat", "wb") as f:
    pickle.dump(records, f)

with open("d:/records.dat", "rb") as f:
    print(pickle.load(f))

````

## 系统编程

### 文件操作

os 模块
1.  返回当前目录
`os.getcwd()`
2.  列出目录的内容
` os.listdir()`
3. 创建目录
`os.mkdir("te")`
4.  删除空目录
`os.rmdir("te")`
5. 重命名
`os.rename('1.py','2.py')`
6.  删除文件
`os.remove('2.py')`
9. 遍历目录中的所有文件
`os.walk` 返回一个3元组生成器
当前目录的名称，当前目录中子目录的列表，当前目录中文件的列表
````
import os

g = os.walk("d:/py/peixun/python-dev")
print(next(g))
print(next(g))
````


os.path 模块
1. abspath()  将相对路径转化为绝对路径
`os.path.abspath(path)`
2. dirname()  获取完整路径当中的目录部分
`os.path.dirname("d:/1/test")`
3. basename()获取完整路径当中的主体部分
`os.path.basename("d:/1/test")`
4. split() 将一个完整的路径切割成目录部分和主体部分
`os.path.split("d:/1/test")`
5. join() 将2个路径合并成一个
`os.path.join("d:/1", "test")`
6. getsize()  获取文件的大小
`os.path.getsize(path)`
7. isfile() 检测是否是文件
`os.path.isfile(path)`
8. isdir()  检测是否是文件夹
`os.path.isdir(path)`

列出目录下包括子目录的所有文件
````
import os

for dirpath, dirames, filenames  in os.walk("d:/py/peixun/python-dev"):
    print('[' + dirpath + ']')
    for filename in filenames:
        print(os.path.join(dirpath, filename))
````

### 调用系统命令

os.systm

`os.system('dir')` 

该命令没有返回值
`print(os.system('dir'))`

```python
import os
r = os.system('dir')
print("返回值", r)
```
os.popen

`os.popen('dir')`

该命令没有输出
```python
import os
r = os.popen('dir')
print(r.read())
```

subprocess

windows
`subprocess.call('cmd /C dir')`

mac/linux
`subprocess.call('dir')`


```python
import subprocess

pipe = subprocess.Popen('cmd /C dir', stdout=subprocess.PIPE)
r = pipe.stdout.read()
print(r.decode('gbk')) # mac 字符集 utf8

```

### 命令行参数

```python
import sys
args = sys.argv
print(args)
print(args[0],args[1])
```
注意: sys.argv 的返回值 是个list

### 环境变量

```python
import os

r = os.environ
print(r)
print(r["PATH"])
```


### 练习
* 递归函数列出所有文件 使用os.listdir os.isfile
* 练习找出单个目录中的最大文件
* 练习找出目录树中的最大文件




##作业
复制目录数,拷贝目录a到a.bak
编写一个pemit装饰器实现权限认证
```
def test(info):
    if info.username == 'root' and 'info.passwd'=='1223':
        print('你有权限')
    else:
        print('你没有权限')
        return 
    return data = "1,2,3" 


def test2(info):
    if info.username == 'root' and info.passwd=='1223':
        print('你有权限')
    else:
        print('你没有权限')
        return 
    return data2 = "4,5,6" 


@permit
def test2(info)
    return data2 = "4,5,6" 

@permit
def test(info)
    return data = "123"
   
实现permit装饰器对权限进行验证
```
