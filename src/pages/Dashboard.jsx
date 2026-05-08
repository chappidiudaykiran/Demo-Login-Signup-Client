import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center px-6 py-4 bg-dark-panel/60 backdrop-blur-lg rounded-2xl border border-white/[0.08] mb-12">
        <h2 className="font-heading text-xl text-white m-0">GuidEx</h2>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400">
            <FiUser />
            <span className="text-sm">{user?.name}</span>
          </div>
          <button onClick={logout}
            className="bg-transparent border border-accent-rose text-accent-rose px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 transition-all font-medium text-sm hover:bg-accent-rose hover:text-white">
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="w-full max-w-5xl">
        <h1 className="font-heading text-4xl mb-3 bg-gradient-to-r from-white to-accent-violet bg-clip-text text-transparent">
          Welcome to your Dashboard
        </h1>
        <p className="text-slate-400 text-lg max-w-xl leading-relaxed mb-8">
          You have successfully authenticated and accessed a protected route. Your session is securely managed via JWT tokens.
        </p>

        {/* Profile Card */}
        <div className="bg-accent-violet/5 border border-accent-violet/20 rounded-2xl p-8 max-w-md">
          <h3 className="mb-6 text-white font-heading text-lg">Profile Details</h3>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">Name</span>
              <span className="text-white font-medium">{user?.name}</span>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-3">
              <span className="text-slate-400">Email</span>
              <span className="text-white font-medium">{user?.email}</span>
            </div>
            <div className="flex justify-between pb-3">
              <span className="text-slate-400">User ID</span>
              <span className="text-accent-cyan font-medium text-sm">{user?.id || user?._id}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
