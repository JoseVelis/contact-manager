function Header({ favoriteCount, totalCount }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">📱 Mi Agenda</h1>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            v1.0
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
            <span className="text-lg">👥</span>
            <span className="text-sm font-medium">Total: {totalCount}</span>
          </div>
          
          <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-2 rounded-lg border border-yellow-400/30">
            <span className="text-lg">⭐</span>
            <span className="text-sm font-medium">Favoritos: {favoriteCount}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
