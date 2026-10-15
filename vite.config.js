import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Video streaming middleware to support HTML5 video range requests in Vite dev server
const videoServePlugin = () => ({
  name: 'video-serve-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const cleanUrl = (req.url || '').split('?')[0];
      if (cleanUrl.toLowerCase().endsWith('.mov') || cleanUrl.toLowerCase().endsWith('.mp4')) {
        const filePath = path.join(process.cwd(), 'public', cleanUrl);
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);
          const fileSize = stat.size;
          const range = req.headers.range;
          const contentType = cleanUrl.toLowerCase().endsWith('.mp4') ? 'video/mp4' : 'video/quicktime';

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${fileSize}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': contentType,
            });
            file.pipe(res);
            return;
          } else {
            res.writeHead(200, {
              'Content-Length': fileSize,
              'Content-Type': contentType,
              'Accept-Ranges': 'bytes',
            });
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
      }
      next();
    });
  }
});

export default defineConfig({
  base: './',
  plugins: [react(), videoServePlugin()],
  server: {
    port: 3000,
    open: true,
    watch: {
      ignored: ['**/*.MOV', '**/*.mov', '**/*.mp4', '**/*.avi', '**/*.mkv']
    }
  }
});
