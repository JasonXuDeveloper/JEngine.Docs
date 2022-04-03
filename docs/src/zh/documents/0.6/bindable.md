# 可绑定数据
该类型可以将数值与事件绑定，当数值出现变化，会调用绑定的事件，JUI需要这个实现数据绑定

## 创建可绑定数据

   ```csharp
   public class MyData
   {
     public int a;//Normal data
     public BindableProperty<int> b = new BindableProperty<int>(0);//Bindable data
   }
   ```

## 获得BindableProperty的值，如何改变

   ```csharp
   void MyMethod()
   {
     //To get a BindableProperty's value:
     int newB = b;//Automatically convert from BindableProperty
     
     //To change a BindableProperty's value:
     b.Value = 10;//Use fieldName.Value to change a value
   }
   ```

## 推荐写法，可以最简化JSON和Protobuf序列化的长度

   ```csharp
    [System.Serializable][global::ProtoBuf.ProtoContract()]
    public class DataClass
    {
        /*
         * Fields to serialize in Protobuf
         */
        [global::ProtoBuf.ProtoMember(1)] public int id = 0;
        [global::ProtoBuf.ProtoMember(2)] public string name = "";
        [global::ProtoBuf.ProtoMember(3)] private long money = 0;
        [global::ProtoBuf.ProtoMember(4)] public bool gm = false;

        /// <summary>
        /// Property which holds the real value and will be serialized in JSON
        /// </summary>
        public long Money
        {
            get
            {
                return money;
            }
            set
            {
                money = value;
                if (BindableMoney != null)
                {
                    BindableMoney.Value = value;
                }
                else
                {
                    BindableMoney = new BindableProperty<long>(value);
                }
            }
        }

        /*
        * Fields to bind but won't be serialized
        */
        internal BindableProperty<long> BindableMoney;


        //将可序列化的值变可绑定的值
        public DataClass()
        {
            id = 0;
            money = 0;
            BindableMoney = new BindableProperty<long>(money);
        }
    }
   ```
