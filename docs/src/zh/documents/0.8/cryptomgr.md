# CryptoMgr

CryptoMgr是JEngine的加密助手

[[toc]]

## 前言
下面提到的成员/函数都是在`CryptoMgr`类下的，这个类型是个静态类型，只需要使用`CryptoMgr.XXX`即可。



## 加密字符串

```csharp
string EncryptStr(string value, string key)
```

`value`，需要加密的字符串

`key`，加密秘钥，16字符

此方法返回加密字符串



## 解密字符串

```csharp
string DecryptStr(string value, string key)
```

`value`，需要加密的字符串

`key`，解密秘钥，16字节（16字符长度的字符串）

此方法返回解密字符串

## 加密二进制

```csharp
byte[] AesEncrypt(byte[] data, string key, CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

```csharp
byte[] AesEncrypt(byte[] data, byte[] key, CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

```csharp
byte[] AesEncrypt(byte[] data, byte[] key, int offset, int length,
            CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

`data`，需要加密的数据

`key`，加密秘钥，16字节

`cipherMode`，加密模式。默认ECB

`paddingMode`，填充模式，默认PKCS7

此方法返回加密的二进制



## 解密二进制

```csharp
byte[] AesDecrypt(byte[] data, string key, CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

```csharp
byte[] AesDecrypt(byte[] data, byte[] key, CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

```csharp
byte[] AesDecrypt(byte[] data, byte[] key, int offset, int length,
            CipherMode cipherMode = CipherMode.ECB,
            PaddingMode paddingMode = PaddingMode.PKCS7)
```

`data`，需要解密的数据

`key`，解密秘钥，16字节

`cipherMode`，解密模式。默认ECB

`paddingMode`，填充模式，默认PKCS7

此方法返回解密的二进制
