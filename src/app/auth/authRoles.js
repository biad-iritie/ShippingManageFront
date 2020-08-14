export const authRoles = {
  sa: ['SA'], // Only Super Admin has access
  admin: ['SA', 'ADMIN', 'OWNER'], // Only SA & Admin has access
  editor: ['SA', 'ADMIN', 'EDITOR', 'OWNER', 'STAFF_MEMBER'], // Only SA & Admin & Editor has access
  guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST', 'OWNER', 'STAFF_MEMBER'] // Everyone has access
}

// Check out app/views/dashboard/DashboardRoutes.js
// Only SA & Admin has dashboard access

// const dashboardRoutes = [
//   {
//     path: "/dashboard/analytics",
//     component: Analytics,
//     auth: authRoles.admin <----------------
//   }
// ];