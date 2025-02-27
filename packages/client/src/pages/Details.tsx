import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Hotel, API_URL, Country, City } from '../constants';

const HotelDetail: React.FC<{ type: string }> = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<Hotel | Country | City | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${API_URL}/${type}/${id}`);

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, type]);

    if (loading || error || !data) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100 text-white text-center">
                {loading ? (
                    <div>
                        <div className="spinner-border text-light" style={{ width: "4rem", height: "4rem" }}></div>
                        <h2 className="mt-3">Loading...</h2>
                    </div>
                ) : error ? (
                    <div>
                        <h2 className="text-danger">Oops!</h2>
                        <p className="fs-4">{error}</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-warning">No Data Found</h2>
                        <p className="fs-4">The requested item could not be found.</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    {type === "hotels" && (
                        <>
                            <h5 className="card-title">{(data as Hotel).hotel_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{(data as Hotel).country}, {(data as Hotel).city}</h6>
                            <p className="card-text">{(data as Hotel).chain_name}</p>
                        </>
                    )}
                    {type === "countries" && <h5 className="card-title">{(data as Country).country}</h5>}
                    {type === "cities" && <h5 className="card-title">{(data as City).name}</h5>}
                </div>
            </div>
            <div className="text-center mt-4">
                <button className="btn btn-primary px-4 py-2" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
};

export default HotelDetail;
