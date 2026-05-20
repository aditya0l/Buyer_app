export interface User {
  id: string;
  name: string;
  phone: string;
  city: string;
  radius: number;
  avatarUrl: string;
}

export const mockUser: User = {
  id: 'usr_981273',
  name: 'Neha Sharma',
  phone: '+91 98765 43210',
  city: 'Delhi NCR',
  radius: 25,
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
};
