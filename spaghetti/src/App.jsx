import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './app.css';
import HomePage from './pages/Home/Home';
import DiaLogProvider from './contexts/DialogProvider';
import { worker } from './__mock__/browser';
import PostListPage from './pages/Post.List';
import PostDetailPage from './pages/Post.Detail';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/posts', element: <PostListPage /> },
    { path: '/post-detail/:postId', element: <PostDetailPage /> },
  ]);
  worker.start();

  return (
    <DiaLogProvider>
      <RouterProvider router={router} />
    </DiaLogProvider>
  );
}

export default App;
