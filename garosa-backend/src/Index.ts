import app from './Application';
import { sequelize } from './Infrastructure/Database/Database';

const initDatabase = async () => {
    await sequelize.sync({ force: false });
    console.log('Connected to Database...');
    console.log('Database synchronized');
};

initDatabase();

app.listen(app.get('port'), () => {
    console.log('Initializing express application...');
    console.log(`Listening on port ${app.get('port')}`);
});
