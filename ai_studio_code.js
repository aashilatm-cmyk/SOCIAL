const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

// بيانات وهمية (تُستبدل بقاعدة بيانات PostgreSQL لاحقاً)
let posts = [
  { id: "1", user: "Ahmed", content: "أهلاً بكم في تطبيقي الجديد!", likes: 12 },
  { id: "2", user: "Sara", content: "البث المباشر سيبدأ قريباً 🚀", likes: 45 },
];

// API لجلب الفيد
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// محرك الرسائل اللحظية (WebSockets)
io.on('connection', (socket) => {
  console.log('مستخدم متصل:', socket.id);

  socket.on('send_message', (data) => {
    // إرسال الرسالة لكل المتصلين (المحادثة الفورية)
    io.emit('receive_message', data);
  });

  socket.on('disconnect', () => console.log('مستخدم فصل الاتصال'));
});

server.listen(3000, () => console.log('السيرفر يعمل على المنفذ 3000'));