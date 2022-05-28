### 有理数：bigint, bigrat, bigfloat

我们将有理数作为原生 Go+ 类型引入。我们使用后缀 `r` 来表示有理文字。例如，(1r << 200) 则表示一个 bigint，其值等于 2<sup>200</sup>，4/5r 表示有理常数 4/5。

```gop
import "math/big"

var a bigint = 1r << 65  // bigint, 类型长度大于 int64
var b bigrat = 4/5r      // bigrat
c := b - 1/3r + 3 * 1/2r // bigrat
println a, b, c

var x *big.Int = 1r << 65 // (1r << 65) 是无类型的 bigint, 可以赋值给 *big.Int
var y *big.Rat = 4/5r
println x, y
```

### 大整型: uint128, int128

```gop
var x uint128 = 1 << 65
var y = x + 1
println x // 输出: 36893488147419103232
println y // 输出: 36893488147419103233
```

### 布尔值转换为整型

```gop
println int(true)       // 输出: 1
println float64(true)   // 输出: 1
println complex64(true) // 输出: (1+0i)
```

### 集合字面量

```gop
x := {"Hello": 1, "xsw": 3.4}   // map[string]float64
y := {"Hello": 1, "xsw": "Go+"} // map[string]interface{}
z := {"Hello": 1, "xsw": 3}     // map[string]int
empty := {}                     // map[string]interface{}

println x, y, z, empty
```

### 切片字面量

```gop
x := [1, 3.4]       // []float64
y := [1]            // []int
z := [1+2i, "xsw"]  // []interface{}
a := [1, 3.4, 3+4i] // []complex128
b := [5+6i]         // []complex128
c := ["xsw", 3]     // []interface{}
empty := []         // []interface{}

println x, y, z, a, b, c, empty
```

### Lambda 表达式

```gop
func plot(fn func(x float64) float64) {
    // ...
}

func plot2(fn func(x float64) (float64, float64)) {
    // ...
}

plot x => x * x           // plot(func(x float64) float64 { return x * x })
plot2 x => (x * x, x + x) // plot2(func(x float64) (float64, float64) { return x * x, x + x })
```

### 推导结构类型

```gop
type Config struct {
    Dir   string
    Level int
}

func foo(conf *Config) {
    // ...
}

foo {Dir: "/foo/bar", Level: 1}
```

这里的 `foo {Dir: "/foo/bar", Level: 1}` 等价于 `foo(&Config{Dir: "/foo/bar", Level: 1})`。但是，您不能将 `foo(&Config{"/foo/bar", 1})` 替换为 `foo {"/foo/bar", 1}`，因为您不能把 `{"/foo/bar", 1}` 作为结构字面量来理解。

您还可以在 return 语句中省略结构类型。例如:

```gop
type Result struct {
    Text string
}

func foo() *Result {
    return {Text: "Hi, Go+"} // return &Result{Text: "Hi, Go+"}
}

println foo()
```


### 列表推导

```gop
a := [x*x for x <- [1, 3, 5, 7, 11]]
b := [x*x for x <- [1, 3, 5, 7, 11], x > 3]
c := [i+v for i, v <- [1, 3, 5, 7, 11], i%2 == 1]
d := [k+","+s for k, s <- {"Hello": "xsw", "Hi": "Go+"}]

arr := [1, 2, 3, 4, 5, 6]
e := [[a, b] for a <- arr, a < b for b <- arr, b > 2]

x := {x: i for i, x <- [1, 3, 5, 7, 11]}
y := {x: i for i, x <- [1, 3, 5, 7, 11], i%2 == 1}
z := {v: k for k, v <- {1: "Hello", 3: "Hi", 5: "xsw", 7: "Go+"}, k > 3}

println a, b, c, d, arr, e, x, y, z
```

### 从集合中选择数据

```gop
type student struct {
    name  string
    score int
}

students := [student{"Ken", 90}, student{"Jason", 80}, student{"Lily", 85}]

unknownScore, ok := {x.score for x <- students, x.name == "Unknown"}
jasonScore := {x.score for x <- students, x.name == "Jason"}

println unknownScore, ok // 输出: 0 false
println jasonScore // 输出: 80
```

### 检查数据是否存在于集合中

```gop
type student struct {
    name  string
    score int
}

students := [student{"Ken", 90}, student{"Jason", 80}, student{"Lily", 85}]

hasJason := {for x <- students, x.name == "Jason"} // 是否有学生叫 Jason？
hasFailed := {for x <- students, x.score < 60}     // 是否有学生不合格？

println hasJason, hasFailed
```

### For 循环

```gop
sum := 0
for x <- [1, 3, 5, 7, 11, 13, 17], x > 3 {
    sum += x
}

println sum
```


### Range 表达式 (`start:end:step`)

```gop
for i <- :10 {
    println i
}

for i := range :10:2 {
    println i
}

for i := range 1:10:3 {
    println i
}

for range :10 {
    println "Range expression"
}
```


### For range of UDT

```gop
type Foo struct {
}

// Gop_Enum(proc func(val ValType)) or:
// Gop_Enum(proc func(key KeyType, val ValType))
func (p *Foo) Gop_Enum(proc func(key int, val string)) {
    // ...
}

foo := &Foo{}
for k, v := range foo {
    println k, v
}

for k, v <- foo {
    println k, v
}

println {v: k for k, v <- foo}
```

**注意：对于 udt.Gop_Enum（回调）的范围，无法使用 break/continue 或 return 语句。**


### For range of UDT2

```gop
type FooIter struct {
}

// (Iterator) Next() (val ValType, ok bool) or:
// (Iterator) Next() (key KeyType, val ValType, ok bool)
func (p *FooIter) Next() (key int, val string, ok bool) {
    // ...
}

type Foo struct {
}

// Gop_Enum() Iterator
func (p *Foo) Gop_Enum() *FooIter {
    // ...
}

foo := &Foo{}
for k, v := range foo {
    println k, v
}

for k, v <- foo {
    println k, v
}

println {v: k for k, v <- foo}
```

### 重载运算符

```gop
import "math/big"

type MyBigInt struct {
    *big.Int
}

func Int(v *big.Int) MyBigInt {
    return MyBigInt{v}
}

func (a MyBigInt) + (b MyBigInt) MyBigInt { // binary operator
    return MyBigInt{new(big.Int).Add(a.Int, b.Int)}
}

func (a MyBigInt) += (b MyBigInt) {
    a.Int.Add(a.Int, b.Int)
}

func -(a MyBigInt) MyBigInt { // unary operator
    return MyBigInt{new(big.Int).Neg(a.Int)}
}

a := Int(1r)
a += Int(2r)
println a + Int(3r)
println -a
```


### 异常处理

我们在Go+中重塑了错误处理规范。 我们称其为 `ErrWrap expressions`:

```gop|raw
expr! // 如果错误，则主动抛出错误
expr? // 如果错误，则返回错误
expr?:defval // 如果错误，则返回defval
```

如何使用它们？以下是一个例子：

```gop
import (
    "strconv"
)

func add(x, y string) (int, error) {
    return strconv.Atoi(x)? + strconv.Atoi(y)?, nil
}

func addSafe(x, y string) int {
    return strconv.Atoi(x)?:0 + strconv.Atoi(y)?:0
}

println `add("100", "23"):`, add("100", "23")!

sum, err := add("10", "abc")
println `add("10", "abc"):`, sum, err

println `addSafe("10", "abc"):`, addSafe("10", "abc")
```

这个例子的输出是：

```gop|raw
add("100", "23"): 123
add("10", "abc"): 0 strconv.Atoi: parsing "abc": invalid syntax

===> errors stack:
main.add("10", "abc")
    /Users/xsw/tutorial/15-ErrWrap/err_wrap.gop:6 strconv.Atoi(y)?

addSafe("10", "abc"): 10
```

与相应的 Go 代码相比，它更清晰、更具可读性。

最有趣的是，返回错误包含完整的错误堆栈。当我们遇到错误时，很容易定位根本原因是什么。

这些 `ErrWrap expressions` 如何工作的？有关更多信息，请参阅 [错误处理](https://github.com/goplus/gop/wiki/Error-Handling)。


### Auto property

让我们看一个用 Go+ 编写的例子：

```gop
import "gop/ast/goptest"

doc := goptest.New(`... Go+ code ...`)!

println doc.Any().FuncDecl().Name()
```

在许多语言中，有一个名为 `property` 的概念，它具有 `get` 和 `set` 方法。

假设我们有 `get property`，上面的例子将是：

```gop
import "gop/ast/goptest"

doc := goptest.New(`... Go+ code ...`)!

println doc.any.funcDecl.name
```

在 Go+ 中，我们引入了一个名为 `auto property` 的概念。它是一个 `get property`，但会自动实现。如果我们有一个名为 `Bar()` 的方法，那么我们将同时拥有一个名为 `bar` 的 `get property`。

### Unix shebang

您现在可以将 Go+ 程序用作 shell 脚本。例如：

```gop
#!/usr/bin/env -S gop run

println "Hello, Go+"

println 1r << 129
println 1/3r + 2/7r*2

arr := [1, 3, 5, 7, 11, 13, 17, 19]
println arr
println [x*x for x <- arr, x > 3]

m := {"Hi": 1, "Go+": 2}
println m
println {v: k for k, v <- m}
println [k for k, _ <- m]
println [v for v <- m]
```

访问 [20-Unix-Shebang/shebang](https://github.com/goplus/tutorial/blob/main/20-Unix-Shebang/shebang) 来获取源代码。