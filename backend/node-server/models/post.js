const {Sequelize, DataTypes} = require('sequelize');

// .env 설정 로딩 -> db 접속
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true, // sql 로그 확인
    }
);

// 테이블 정의
const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// 테이블 동기화
(async () => {
    try{
        await sequelize.authenticate();
        console.log('DB 연결 성공');
        await sequelize.sync({alter: true}); //테이블 자동 생성
        console.log('테이블 동기화 완료');
    } catch (error) {
        console.error('DB 연결 실패:', error);
    }
})();

module.exports = {Post};
