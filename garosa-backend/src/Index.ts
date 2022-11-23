import app from './Application';

app.listen(app.get('port'), () => {
    console.log('Initializing express application...');
    console.log(`Listening on port ${app.get('port')}`);
});