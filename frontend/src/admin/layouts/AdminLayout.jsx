import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 