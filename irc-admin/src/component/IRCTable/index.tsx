import React from 'react';


const MUITable = () => {
    return (
        <div className="col-lg-8 d-flex align-items-stretch">
            <div className="card w-100">
                <div className="card-body p-4">
                    <h5 className="card-title fw-semibold mb-4">Recent Transactions</h5>
                    <div className="table-responsive">
                        <table className="table text-nowrap mb-0 align-middle">
                            <thead className="text-dark fs-4">
                                <tr>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Id</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Assigned</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Name</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Priority</h6>
                                    </th>
                                    <th className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0">Budget</h6>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">1</h6></td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-1">Sunil Joshi</h6>
                                        <span className="fw-normal">Web Designer</span>
                                    </td>
                                    <td className="border-bottom-0">
                                        <p className="mb-0 fw-normal">Elite Admin</p>
                                    </td>
                                    <td className="border-bottom-0">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-primary rounded-3 fw-semibold">Low</span>
                                        </div>
                                    </td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0 fs-4">$3.9</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">2</h6></td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-1">Andrew McDownland</h6>
                                        <span className="fw-normal">Project Manager</span>
                                    </td>
                                    <td className="border-bottom-0">
                                        <p className="mb-0 fw-normal">Real Homes WP Theme</p>
                                    </td>
                                    <td className="border-bottom-0">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                                        </div>
                                    </td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0 fs-4">$24.5k</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">3</h6></td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-1">Christopher Jamil</h6>
                                        <span className="fw-normal">Project Manager</span>
                                    </td>
                                    <td className="border-bottom-0">
                                        <p className="mb-0 fw-normal">MedicalPro WP Theme</p>
                                    </td>
                                    <td className="border-bottom-0">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-danger rounded-3 fw-semibold">High</span>
                                        </div>
                                    </td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0 fs-4">$12.8k</h6>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-bottom-0"><h6 className="fw-semibold mb-0">4</h6></td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-1">Nirav Joshi</h6>
                                        <span className="fw-normal">Frontend Engineer</span>
                                    </td>
                                    <td className="border-bottom-0">
                                        <p className="mb-0 fw-normal">Hosting Press HTML</p>
                                    </td>
                                    <td className="border-bottom-0">
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="badge bg-success rounded-3 fw-semibold">Critical</span>
                                        </div>
                                    </td>
                                    <td className="border-bottom-0">
                                        <h6 className="fw-semibold mb-0 fs-4">$2.4k</h6>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MUITable;