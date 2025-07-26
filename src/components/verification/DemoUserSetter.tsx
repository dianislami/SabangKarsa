import { Button } from '../ui/button';

export function DemoUserSetter() {
  const setDemoUser = (role: 'buyer' | 'seller' | 'admin', verificationStatus?: 'none' | 'pending' | 'approved' | 'rejected') => {
    const demoUser = {
      id: 'demo_user_' + role,
      name: role === 'buyer' ? 'John Buyer' : role === 'seller' ? 'Jane Seller' : 'Admin User',
      email: `${role}@example.com`,
      role,
      verificationStatus: verificationStatus || 'none'
    };
    
    localStorage.setItem('user', JSON.stringify(demoUser));
    localStorage.setItem('token', 'demo_token_' + role);
    window.location.reload();
  };

  const clearUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      <h3 className="text-sm font-semibold mb-3 text-foreground">Demo User Setter</h3>
      <div className="space-y-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDemoUser('buyer')}
          className="w-full text-xs"
        >
          Set as Buyer
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDemoUser('buyer', 'pending')}
          className="w-full text-xs"
        >
          Buyer (Pending)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDemoUser('seller', 'approved')}
          className="w-full text-xs"
        >
          Seller (Verified)
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setDemoUser('admin')}
          className="w-full text-xs"
        >
          Set as Admin
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={clearUser}
          className="w-full text-xs"
        >
          Clear User
        </Button>
      </div>
    </div>
  );
}
