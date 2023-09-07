import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from "../axiosConfig";

const SubscriberDetail = () => {

    const [subscriber, setSubscriber] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        (async () => await load())();
    }, []);

    async function load() {
        setLoading(true);
        try {
            const result = await api.get(`/subscriber/${id}`);
            setSubscriber(result.data);
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


    return (
        <>
            <AppNavbar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Subscriber</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Phone Number:</strong> {subscriber.phoneNumber}
                            </li>
                            <li className="list-group-item">
                                <strong>Username:</strong> {subscriber.username}
                            </li>
                            <li className="list-group-item">
                                <strong>Domain:</strong> {subscriber.domain}
                            </li>
                            <li className="list-group-item">
                                <strong>Status:</strong> {subscriber.status}
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <h2>Features</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <strong>Call Forward No Reply:</strong>
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <strong>Provisioned:</strong> {subscriber.features.callForwardNoReply.provisioned ? 'Yes' : 'No'}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Destination:</strong>{subscriber.features.callForwardNoReply.destination}
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

};

export default SubscriberDetail;