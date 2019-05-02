---
title: myChat
date: 2017-06-23 17:32:35
tags: java 
---




一个使用java编写的基于[UDP协议](http://baike.baidu.com/link?url=h_t84oqdxzS4fWhBQb-N3AKA0SN-G0LbTmYu3GZGL9qbigG8tMnSUZFBtQp3YYbBx43fTFm2HucIq_uzYEG08q)简单聊天程序。
主要包括四个类：发送类、接收类、GUI和主类。能够实现同一局域网下的两台主机相互聊天。


### 程序源代码如下：

#### 1. 发送类(Sender)
``` java
package com.zero;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.net.*;


public class Sender extends ChatWindow implements Runnable
{
    private DatagramSocket ds;  //发送数据包的套接字
    private int sendPort;    //发送端口
    public Sender(DatagramSocket ds, int port, String windowName)
    {
        super(windowName);
        this.ds = ds;
        this.sendPort = port;
    }
    
    public void run()    //发送线程
    {
        try
        {
                myEvent();
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }
    
    public void send_mess(String message)
    {
        try
        {
            byte[] by = message.getBytes();   //将消息转换为比特数组
            DatagramPacket dp = new DatagramPacket(by, by.length, InetAddress.getByName("127.0.0.1"), sendPort);  //封装数据包
            ds.send(dp);   //发送数据包 
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }
    
    public void myEvent()
    {
        //窗口点击关闭事件
        f.addWindowListener(new WindowAdapter()
        {
            public void windowClosing(WindowEvent e)
            {
                ds.close();    //关闭服务
                System.exit(0);
            }
        });
       
        sendBut.addActionListener(new ActionListener()   //给发送按钮添加事件
        {
            
            @Override
            public void actionPerformed(ActionEvent e)
            {
                try
                {
                    String mess = editArea.getText();   //获取输入聊天消息
                    send_mess(mess);
                    chatArea.append(mess+System.getProperty("line.separator"));
                }
                catch(Exception ex)
                {
                    ex.printStackTrace();
                }
                finally
                {
                    editArea.setText(null);
                }
            }
        });
        
        editArea.addKeyListener(new KeyAdapter()
        {
            public void keyPressed(KeyEvent e)
            {
                try
                {
                    if(e.getKeyCode()==KeyEvent.VK_ENTER)
                    {
                        String mess = editArea.getText();   //获取输入聊天消息
                        send_mess(mess);
                        chatArea.append(mess+System.getProperty("line.separator"));
                    }
                }
                catch(Exception ex)
                {
                    ex.printStackTrace();
                }
                finally
                {
                    editArea.setText(null);
                }
            }
        });
    }
}
```

#### 2. 接收类(Receiver)
```java
package com.zero;

import java.net.DatagramPacket;
import java.net.DatagramSocket;

public class Receiver implements Runnable
{
    private DatagramSocket ds;  //接收数据报的套接字  
    public Receiver(DatagramSocket ds)
    {
        this.ds = ds;
    }
    
    public void run()   //实现run()方法
    {
        try
        {
            while(true)
            {
                    byte[] buf = new byte[1024];
                    DatagramPacket dp = new DatagramPacket(buf, buf.length);   
                    
                    ds.receive(dp); //接收数据包
                    String ip = dp.getAddress().getHostAddress();
                    String mess = new String(dp.getData(), 0, dp.getLength());
                    ChatWindow.chatArea.append("From ip:"+ip+",message:"+mess+System.getProperty("line.separator"));
            }
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }
    }
}
```

#### 3. GUI界面类
```java
package com.zero;

import java.awt.Button;
import java.awt.FlowLayout;
import java.awt.Frame;
import java.awt.TextArea;

public class ChatWindow
{
    protected Frame f;
    protected Button sendBut;
    protected static TextArea editArea, chatArea;
    
    ChatWindow()
    {
        init("hahahaha");
    }
    
    ChatWindow(String windowName)
    {
        init(windowName);
    }
    
    public void init(String windowName)   //窗体初始化
    {
        f = new Frame(windowName);
        f.setBounds(300, 100, 400, 500);
        f.setLayout(new FlowLayout());
        sendBut = new Button("send");
        editArea = new TextArea(8, 50);
        chatArea = new TextArea(16, 50);
        chatArea.setEditable(false);     //chatArea为聊天消息显示区，不可编辑
        
        f.add(chatArea);         //添加组件
        f.add(editArea);
        f.add(sendBut);
        
        f.setVisible(true);    
    }
}
```

#### 4. 主类(ChatDemo)

说明：ChatDemo类只是一端的聊天程序，是基于多线程的程序，发送和接收个占用一个线程。要实现聊天只需要在局域网中的另一台设备上再启动一个主类并且修改相应的ip地址以及端口号即可。
```java
package com.zero;

import java.net.DatagramSocket;

public class ChatDemo
{

    public static void main(String[] args) throws Exception
    {
        // TODO Auto-generated method stub
        //new ChatWindow("chatwindow1");
        
        DatagramSocket sendSocket = new DatagramSocket();
        DatagramSocket receiveSocket = new DatagramSocket(10000);  //监听端口号
        
        new Thread(new Sender(sendSocket, 10001, "Chatwindow of A")).start();   //启动发送线程，10001为发送端口号
        new Thread(new Receiver(receiveSocket)).start();  //启动接收线程
    }

}
```

这个程序比较简单，我也省略了线程同步的步骤。另外只能在同一个局域网下的两台设备上运行，至于为什么不能在不同局域网间通信这个问题涉及到网络映射等问题，才学疏浅的我现在还不能给出解决，很遗憾。