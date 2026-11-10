export const requireAdminAuth = (req, res, next) => {
  const secretKey = process.env.ADMIN_SECRET_KEY || 'nivara_admin_secure_key_2026';
  const authHeader = req.headers['authorization'];
  const customHeader = req.headers['x-admin-key'];

  let token = customHeader;
  if (!token && authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token || token !== secretKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Administrative access token is invalid or missing.'
    });
  }

  next();
};
