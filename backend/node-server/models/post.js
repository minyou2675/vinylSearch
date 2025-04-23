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
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

  // 👇 이 부분을 테스트에서 제외할 수 있게 export만 하고,
  // 실제 앱에서만 동기화 실행
  module.exports = { Post, sequelize };

