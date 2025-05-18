import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// 连接MongoDB Atlas（需替换为你的数据库URL）
mongoose.connect('mongodb+srv://Jetty:73521010WangYaohui@cluster0.fbtfg8w.mongodb.net/corpus?retryWrites=true&w=majority')
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error(err));   
// 模拟语料数据（开发阶段使用，正式环境需从数据库读取）
const mockEntries = [
  { name: '爱国主义', pinyinInitial: 'A', strokes: 21, description: '...' },
  { name: '民族团结', pinyinInitial: 'M', strokes: 29, description: '...' }
];

// 接口：获取分类列表（按首字母）
app.get('/api/category/:letter', (req, res) => {
  const { letter } = req.params;
  const entries = mockEntries.filter(e => e.pinyinInitial === letter);
  res.json(entries.sort((a, b) => a.strokes - b.strokes));
});

// 启动服务
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`后端运行于 http://localhost:${PORT}`));    