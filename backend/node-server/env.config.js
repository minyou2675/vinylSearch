module.exports = {
    // Database Configuration
    DB_HOST: process.env.DB_HOST || 'mysql',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '1234',
    DB_NAME: process.env.DB_NAME || 'lpsearch',

    // Server Configuration
    PORT: process.env.PORT || 3001,
    NODE_ENV: process.env.NODE_ENV || 'development',

}; 