import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

interface CorpusEntry {
  id: string;
  name: string;
  description: string;
}

const Category = () => {
  const { letter } = useParams();
  const [entries, setEntries] = useState<CorpusEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 使用环境变量中的API地址
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/category/${letter}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setEntries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [letter]);

  return (
    <Box padding={3}>
      <Typography variant="h4" mb={3}>
        首字母 {letter} 条目（{entries.length}条）
      </Typography>

      {/* 修正 Grid 组件使用 */}
      <Grid container spacing={2}>
        {entries.map(entry => (
          <Grid
            key={entry.id}
            sx={{
              gridColumn: {
                xs: 'span 12',  // 移动设备：占满整行
                sm: 'span 6',   // 平板：每行2个
                md: 'span 4',   // 桌面：每行3个
              },
            }}
          >
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 4,
                padding: 2,
                cursor: 'pointer',
                '&:hover': { background: '#f5f5f5' },
              }}
            >
              <Typography variant="h6">{entry.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {entry.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;  