# 长联网解决方案

## JWebSocket

JWebSocket是JEngine提供的对websocket后端建立长连接的解决方案

与```node.js```的```socket-io v2```完美兼容

::: tip

如果后端使用```socket-io```，请确保使用的版本是```v2.x```，或者自行修改JWebSocket建立连接部分源码

:::

[[toc]]

### 命名空间

```csharp
using JEngine.Net;
```



### 配置

```csharp
public class JSocketConfig
{
  public bool debug = false;
  public bool autoConnect = false;
  public int reconnectDelay = 5;
  public float ackExpirationTime = 30f;
  public float pingInterval = 25f;
  public float pingTimeout = 60f;
  public string eventOpenName = "open";
  public string eventConnectName = "connect";
  public string eventDisconnectName = "disconnect";
  public string eventErrorName = "error";
  public string eventCloseName = "close";

  public static JSocketConfig Default()
  {
    return new JSocketConfig();
  }
}
```

配置内按以下顺序定义了：

- 是否调试（显示报错）
- 是否自动重连
- 自动重连间隔
- 发的包的过期时间（仅限socketio）
- ping间隔
- ping超时
- open事件名
- connect事件名
- disconnect事件名
- error事件名
- close事件名
- 默认配置

### 接口

#### 初始化

```csharp
/// <summary>
/// 连接websokcet服务器，如果使用的socket-io，请给isSocketIO参数设置为true（socketio是nodejs服务器使用的一个websocket插件）
/// </summary>
/// <param name="url"></param>
/// <param name="config"></param>
/// <param name="isSocketIO"></param>
public JWebSocket(string url,JSocketConfig config = null,Action<object,MessageEventArgs> OnMessage = null)
```

> OnMessage是收到消息后的处理回调，socketio服务端这里可以为null，反之必须写回调，不然收到消息也没办法处理

#### 连接

```csharp
/// <summary>
/// Connect to server, this method doesn't block the context
/// 连接服务器，此方法不阻塞
/// </summary>
public void Connect()
```

#### 设置回调相关接口（仅限非socket-io服务端）

```csharp
public void OnOpen(Action<SocketIOEvent> socketIOEvent)
```

```csharp
public void OnConnect(Action<SocketIOEvent> socketIOEvent)
```

```csharp
public void OnReconnect(Action socketIOEvent)
```

```csharp
public void OnDisconnect(Action<SocketIOEvent> socketIOEvent)
```

```csharp
public void OnClose(Action<SocketIOEvent> socketIOEvent)
```

```csharp
public void OnError(Action<SocketIOEvent> socketIOEvent)
```

#### 设置回调相关接口（仅限socket-io服务端）

```csharp
public void SocketIO_On(string eventName, Action<SocketIOEvent> socketIOEvent)
```

```csharp
public void SocketIO_Off(string eventName, Action<SocketIOEvent> socketIOEvent)
```

#### 发送信息（仅限非socket-io服务端）

```csharp
public void SendToServer(string Data)
```

```csharp
public void SendToServerAsJson<T>(T Data)
```

```csharp
public void SendToServerAsProtobuf<T>(T Data) where T : class
```

```csharp
public void SendToServer(byte[] Data)
```

> 按顺序依次是：发字符串，发json字符串，发protobuf二进制，发二进制

#### 发送信息（仅限socket-io服务端）

> 这里的ev是事件名

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
public void EmitToSocketIOServer(string ev)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
/// <param name="onComplete">异步并行回调</param>
public void EmitToSocketIOServerAsync(string ev, Action<bool> onComplete)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
/// /// <returns>发送结果 emit result</returns>
public async Task<bool> EmitToSocketIOServerAsync(string ev)
```

```csharp
/// <summary>
/// Call event on server with a call back (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并包含一个回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
/// <param name="action">回调 callback</param>
public void EmitToSocketIOServer(string ev, Action<JSONObject> action)
```

```csharp
/// <summary>
/// Call event on server with a call back (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并包含一个回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
/// <param name="action">回调 callback</param>
/// <param name="onComplete">异步并行回调</param>
public void EmitToSocketIOServerAsync(string ev, Action<JSONObject> action, Action<bool> onComplete)
```

```csharp
/// <summary>
/// Call event on server with a call back (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并包含一个回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev"></param>
/// <param name="action">回调 callback</param>
/// <returns>发送结果 emit result</returns>
public async Task<bool> EmitToSocketIOServerAsync(string ev, Action<JSONObject> action)
```

```csharp
/// <summary>
/// Call event on server with a string (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个字符串（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="str">字符串 string</param>
public void EmitToSocketIOServer(string ev, string str)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个字符串（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// /// <param name="str">字符串 string</param>
/// <param name="onComplete">异步并行回调</param>
public void EmitToSocketIOServerAsync(string ev, string str, Action<bool> onComplete)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个字符串（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// /// <param name="str">字符串 string</param>
/// <returns>发送结果 emit result</returns>
public async Task<bool> EmitToSocketIOServerAsync(string ev, string str)
```

```csharp
/// <summary>
/// Call event on server with a json data (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个JSON数据（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
public void EmitToSocketIOServer(string ev, JSONObject data)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个JSON数据（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
/// <param name="onComplete">异步并行回调</param>
public void EmitToSocketIOServerAsync(string ev, JSONObject data, Action<bool> onComplete)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，并发送个JSON数据（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
/// <param name="action">回调 callback</param>
/// <returns>发送结果 emit result</returns>
public async Task<bool> EmitToSocketIOServerAsync(string ev, JSONObject data)
```

```csharp
/// <summary>
/// Call event on server with a json data and a callback(only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，发送JSON数据且包含回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
/// <param name="action">回调 callback</param>
public void EmitToSocketIOServer(string ev, JSONObject data, Action<JSONObject> action)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，发送JSON数据且包含回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
/// <param name="action">回调 callback</param>
/// <param name="onComplete">异步并行回调</param>
public void EmitToSocketIOServerAsync(string ev, JSONObject data, Action<JSONObject> action, Action<bool> onComplete)
```

```csharp
/// <summary>
/// Call event on server (only for socket-io servers, eg. nodeJS servers that uses socket-io)
/// 调用服务端事件，发送JSON数据且包含回调（只有使用socket-io搭建的服务器才能使用该接口，比如nodeJS使用socket-io的服务器）
/// </summary>
/// <param name="ev">事件名字 event name</param>
/// <param name="data">json数据 json data</param>
/// <param name="action">回调 callback</param>
/// <returns>发送结果 emit result</returns>
public async Task<bool> EmitToSocketIOServerAsync(string ev, JSONObject data, Action<JSONObject> action)
```



### 注意事项

- 连接其他web socket服务器，需要自己实现on方法，在OnMessageFromNormalServer方法内根据自己的消息模型自己实现。
- 连接普通WebSocket服务器的方法监听，建议有服务器基础，且C#有经验的人去写监听，没经验的，也可以用这个做发送，但是监听这边会很麻烦



### 示范服务端

地址：[https://github.com/JasonXuDeveloper/JEngine-WebSocket-Server-Demo](https://github.com/JasonXuDeveloper/JEngine-WebSocket-Server-Demo)

### 使用示范

```csharp
using System;
using JEngine.Core;
using JEngine.Net;
using WebSocketSharp;

namespace JEngine.Examples
{
  public class JWebSocketDemo
  {
    /// <summary>
    /// 接收服务器消息的方法
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private static void OnMessageFromNormalServer(object sender, MessageEventArgs e)
    {
      Log.Print("服务端发送了：" + e.Data);//二进制是e.RawData

      /*在这里给个具体思路
      * 例如目前封装的socket io的消息模型
      * socketio采用的是json封装，包含了event name，event type 和 event data（这个在socket io 的packer里）
      * event name 顾名思义是事件名称
      * event type 这个可以忽略，就是事件类型，普遍是message
      * event data 是数据的json格式
      * 会返回一个JSONObject，然后可以根据这个JSONObject做你的逻辑
      * 
      * 所以这里的思路是你也封装一个这样的模型，然后写个字典来存事件
      * 以socket io 为例，先解析e.Data，得到字符串：event name，JSONObject：event data
      * 然后直接在Dictionary<string,Action<JSONObject>>的字典里，获取event name这个值
      * 如果存在，Invoke(data)，通过数据去Invoke回调
      * 然后没然后了，别在群里问JWebSocket非socket io 服务器怎么事件派发无效了，
      * 因为你们要自己按项目定模型，自己写的，JEngine不是双端框架，不像ET那样直接限制前后端通信方式，
      * JEngine告诉你该怎么搞，工具给你写完，后面的就要靠你自己了！
      * 
      * 所以这里建议没接触过后端的，用nodeJS服务器，用里面的socketIO，当时我从没接触过后端到能撸双端游戏，这个东西功不可没
      * 
      * 如果一定要写的，可以研究下JEvent，专门搞一个类处理事件，
      * 里面的方法全写为void xxx(string event, JSONObject data)，然后类打上[Subscriber]标签
      * 然后写个JEvent来注册，在这里获取到event name 和event data 后直接JEvent.Post就能派发了，简单的很~
      */
    }

    /// <summary>
    /// 这个用于连接其他web socket服务器，需要自己实现on方法，在OnMessageFromNormalServer方法内根据自己的消息模型自己实现。
    /// 这个连接普通WebSocket服务器的方法监听，建议有服务器基础，且C#有经验的人去写监听，没经验的，也可以用这个做发送，但是监听这边会很麻烦
    /// </summary>
    public static void RunNormalServerDemo(string ip, int port)
    {
      /*
      * 这个地方也有个配套demo，到时候会上传到GitHub，估计叫做JEngine.Net WebSokcet Server Demo
      */

      //直接连接，使用默认配置(中间参数null)，需要配置一个接收服务器消息的方法
      JWebSocket socket = new JWebSocket($"ws://{ip}:{port}/demo", null, OnMessageFromNormalServer);

      //带配置连接，需要配置一个接收服务器消息的方法
      //JSocketConfig config = JSocketConfig.Default();
      //config.debug = true;
      //JSocket socket = new JSocket($"ws://{ip}:{port}/demo", config, OnMessageFromNormalServer);

      socket.OnConnect((e) =>
                       {
                         Log.Print("服务端连接成功");

                         //发送hi到服务端
                         socket.SendToServer("hi");//同步
                       });

      socket.OnError(e =>
                     {
                       Log.PrintError(e);
                     });

      socket.OnDisconnect((e) =>
                          {
                            Log.Print("服务端连接关闭");
                          });

      //此方法不阻塞
      socket.Connect();

      //断线重连事件
      socket.OnReconnect(() =>
                         {
                           Log.Print("断开连接后重连成功");
                         });

      //这个地方不能用SocketIO_On来监听事件，因为不同的人的消息模型不同，所以需要在OnMessageFromNormalServer内根据服务器发来的东西自己实现
    }

    /// <summary>
    /// 这个用于连接socket-io服务器
    /// </summary>
    public static void RunSocketIOServerDemo(string ip, int port)
    {
      /* 使用前需要建立node js 服务器，并npm按照socket io，参考socketio的官网
      * 将下面的js代码丢你nodejs服务器里并node运行

                let server = require('socket.io');//socket

                let io = new server(8001);//创建服务器于7999端口
                console.log('服务器已开始运行');
                //开始运行服务器
                io.on('connection', async function(socket) {
                    //连接信息
                    console.log("有连接了,sid: "+socket.id);

                    //监听事件
                    socket.on('hi',function(){
                        //发送事件
                        socket.emit("hi_back");
                        console.log("已发送hi_back");
                    });


                    //发送事件+数据
                    var player = new Object();
                    player.id = 666;
                    player.name = "傑";
                    socket.emit("simulate_auth",player);
                });

*/

      //直接连接，使用默认配置
      JWebSocket socket = new JWebSocket($"ws://{ip}:{port}/socket.io/?EIO=3&transport=websocket");

      //带配置连接
      //JSocketConfig config = JSocketConfig.Default();
      //config.debug = true;
      //JSocket socket = new JSocket($"ws://{ip}:{port}/socket.io/?EIO=3&transport=websocket", config);

      socket.OnConnect(async (e) =>
                       {
                         Log.Print("服务端连接成功");

                         //发送hi到服务端
                         socket.EmitToSocketIOServer("hi");//同步

                         socket.EmitToSocketIOServerAsync("hi", (bool res) =>
                                                          {
                                                            Log.Print("异步并行发送" + (res ? "成功" : "失败"));
                                                          });//异步并行

                         var result = await socket.EmitToSocketIOServerAsync("hi");
                         Log.Print("纯异步发送" + (result ? "成功" : "失败"));//纯异步
                       });

      socket.OnDisconnect((e) =>
                          {
                            Log.Print("服务端连接关闭");
                          });

      //此方法不阻塞
      socket.Connect();

      //断线重连事件
      socket.OnReconnect(() =>
                         {
                           Log.Print("断开连接后重连成功");
                         });

      //监听hi_back事件
      socket.SocketIO_On("hi_back", (e) =>
                         {
                           Log.Print("这里只会收到hi_back这个字符串，作为SocketIOEvent.Name，而这个事件的data为空");
                           Log.Print($"{e.name}: {e.data}");
                           Log.Print($"当前在线程：{System.Threading.Thread.CurrentThread.ManagedThreadId}");
                         });

      //监听simulate_auth事件
      socket.SocketIO_On("simulate_auth", (e) =>
                         {
                           Log.Print("这里SocketIOEvent.Name是simulate_auth，而这个事件的data是js服务器发来的json数据");
                           Log.Print($"{e.name}: {e.data.ToString()}");
                           Log.Print("解析JSONData也很简单");
                           var jsonData = e.data;
                           Log.Print($"服务端发来的数据的json的keys是：{string.Join(",", jsonData.keys)}");
                           Log.Print($"服务端发来的数据的id是：{jsonData["id"]}");
                           Log.Print($"服务端发来的数据的name是：{jsonData["name"]}");
                           Log.Print($"当前在线程：{System.Threading.Thread.CurrentThread.ManagedThreadId}");
                         });
    }
  }
}
```

