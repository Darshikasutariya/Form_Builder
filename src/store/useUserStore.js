import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useUserStore = create(
    persist(
        (set,get)=> ({
            uses: [],
            selectedUser: null,

            // Add User
            addUser:(name)=>{
                const newUser = {
                    id: Date.now(),
                    name,
                    createdAt: new Date().toISOString()
                };
                set((state)=>({
                    users:[...state.users,newUser]
                }))
            },

            //Select User for editing
            selectUser : (userId)=>{
                const user = get().users.find((u)=> u.id ===userId);
                set({selectedUser: user});
            },
            // Get all users
      getUsers: () => get().users,

            // Delete User
            deleteUser: (userId)=>{
                set((state)=>({
                    users: state.users.filter((u)=> u.id !== userId)
                }))
            },
        })
    ),{
        name:'user-storage'
    }
)

export default useUserStore;