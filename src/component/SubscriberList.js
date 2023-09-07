import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from "../axiosConfig";
import AppNavbar from './AppNavbar';

const SubscriberList = () => {

    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => await load())();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const result = await api.get("/subscriber/all");
            setSubscribers(result.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error...</p>;
    }

    const subscribersList = subscribers.map(subscriber => {
        return <tr key={subscriber.phoneNumber}>
            <td>{subscriber.phoneNumber}</td>
            <td>{subscriber.username}</td>
            <td>{subscriber.status}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/subscriber/" + subscriber.phoneNumber}>View</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <>
            <AppNavbar />
            <Container fluid>
                <h3>Subscribers</h3>
                <Table>
                    <thead>
                        <tr>
                            <th>Phone Number</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribersList}
                    </tbody>
                </Table>
            </Container>
        </>
    );
};

export default SubscriberList;