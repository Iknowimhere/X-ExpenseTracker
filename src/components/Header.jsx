
export const Header = () => {
    return (
        <div style={{ padding: '1em' }}>
            <h1 style={{marginBottom:'8px'}}>Expense Tracker</h1>
            <div style={{ backgroundColor: '#626262', borderRadius: '1em', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', boxShadow: '0 4px 4px rgba(0,0,0,0.2)', padding: '2em' }}>
                {/* wallet balance */}
                <div style={{ backgroundColor: '#9B9B9B', boxShadow: '0 4px 4px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3em 2em', borderRadius: '1em', width: '30%' }}>
                    <p style={{ fontSize: '2em', fontWeight: '400', marginBottom: '1em' }}>Wallet Balance: <span style={{ color: '#B5DC52', fontWeight: '700' }}>₹ 4500</span> </p>
                    <button style={{ padding: '1em 2em', background: 'linear-gradient(#B5DC52,#89E148)', border: 'none', color: '#fff', borderRadius: '1em', fontWeight: 'bolder',fontSize:'larger' }}>Add Income</button>
                </div>
                {/* Expenses */}
                <div style={{ backgroundColor: '#9B9B9B', boxShadow: '0 4px 4px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3em 2em', borderRadius: '1em', width: '30%' }}>
                    <p style={{ fontSize: '2em', fontWeight: '400', marginBottom: '1em' }}>Expenses: <span style={{ color: '#F4BB4A', fontWeight: '700' }}>₹ 500</span> </p>
                    <button style={{ padding: '1em 2em', background: 'linear-gradient(#FF9595,#FF4747,#FF3838)', border: 'none', color: '#fff', borderRadius: '1em', fontWeight: 'bolder',fontSize:'larger' }}>Add Expense</button>
                </div>
                {/* pie chart */}
                <h3>piechart</h3>
            </div>
        </div>
    )
}
