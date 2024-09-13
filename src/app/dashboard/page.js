// src/app/dashboard/page.js
import PrivateLayout from '../../components/layouts/PrivateLayout';

export default function Dashboard() {
    return (
        <PrivateLayout>
            <h2>Bienvenido al Dashboard</h2>
            <p>Solo puedes ver esta página si estás autenticado.</p>
        </PrivateLayout>
    );
}
