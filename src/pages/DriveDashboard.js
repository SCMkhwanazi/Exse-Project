import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('deliveries');
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const isDriver = role === 'driver';
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [deliveries, setDeliveries] = useState([]);
  const [driverStats, setDriverStats] = useState({
    totalDeliveries: 0,
    completedDeliveries: 0,
    pendingDeliveries: 0,
    totalEarnings: 0,
    rating: 4.8,
    onlineHours: 0
  });

  // Mock data - In real app, this would come from an API
  useEffect(() => {
    // Simulate fetching driver data
    const mockDeliveries = [
      {
        id: 'ORD-001',
        customer: 'John Smith',
        address: '123 Main St, Apt 4B',
        restaurant: 'Pizza Palace',
        items: ['Margherita Pizza', 'Garlic Bread'],
        total: '$18.98',
        status: 'pending',
        distance: '2.3 miles',
        estimatedTime: '15 min',
        phone: '+1 (555) 123-4567'
      },
      {
        id: 'ORD-002',
        customer: 'Sarah Johnson',
        address: '456 Oak Ave',
        restaurant: 'Burger Hub',
        items: ['Classic Burger', 'French Fries'],
        total: '$14.98',
        status: 'accepted',
        distance: '1.8 miles',
        estimatedTime: '12 min',
        phone: '+1 (555) 234-5678'
      },
      {
        id: 'ORD-003',
        customer: 'Mike Wilson',
        address: '789 Pine Rd',
        restaurant: 'Noodle House',
        items: ['Pad Thai', 'Spring Rolls'],
        total: '$18.98',
        status: 'in-transit',
        distance: '3.1 miles',
        estimatedTime: '20 min',
        phone: '+1 (555) 345-6789'
      },
      {
        id: 'ORD-004',
        customer: 'Emily Brown',
        address: '321 Elm St',
        restaurant: 'Pizza Palace',
        items: ['Pepperoni Pizza'],
        total: '$14.99',
        status: 'completed',
        distance: '1.2 miles',
        completedTime: '10 min ago',
        phone: '+1 (555) 456-7890'
      },
      {
        id: 'ORD-005',
        customer: 'David Lee',
        address: '654 Cedar Ln',
        restaurant: 'Burger Hub',
        items: ['Cheese Burger', 'Onion Rings'],
        total: '$15.98',
        status: 'completed',
        distance: '2.5 miles',
        completedTime: '25 min ago',
        phone: '+1 (555) 567-8901'
      }
    ];

    setDeliveries(mockDeliveries);

    // Calculate stats
    const completed = mockDeliveries.filter(d => d.status === 'completed').length;
    const pending = mockDeliveries.filter(d => ['pending', 'accepted', 'in-transit'].includes(d.status)).length;
    const earnings = mockDeliveries
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + parseFloat(d.total.replace('$', '')), 0);

    setDriverStats({
      totalDeliveries: mockDeliveries.length,
      completedDeliveries: completed,
      pendingDeliveries: pending,
      totalEarnings: earnings,
      rating: 4.8,
      onlineHours: 12.5
    });
  }, []);

  const handleStatusUpdate = (orderId, newStatus) => {
    // Update delivery status
    setDeliveries(prev => 
      prev.map(d => d.id === orderId ? { ...d, status: newStatus } : d)
    );

    // Show toast notification
    setToastMessage(`Order ${orderId} marked as ${newStatus}`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);

    // Update stats if completed
    if (newStatus === 'completed') {
      const completedOrder = deliveries.find(d => d.id === orderId);
      if (completedOrder) {
        const earnings = parseFloat(completedOrder.total.replace('$', ''));
        setDriverStats(prev => ({
          ...prev,
          completedDeliveries: prev.completedDeliveries + 1,
          pendingDeliveries: prev.pendingDeliveries - 1,
          totalEarnings: prev.totalEarnings + earnings
        }));
      }
    }
  };

  const handleAcceptDelivery = (orderId) => {
    handleStatusUpdate(orderId, 'accepted');
  };

  const handleStartDelivery = (orderId) => {
    handleStatusUpdate(orderId, 'in-transit');
  };

  const handleCompleteDelivery = (orderId) => {
    handleStatusUpdate(orderId, 'completed');
  };

  const handleGoOnline = () => {
    setToastMessage('You are now online and available for deliveries');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleGoOffline = () => {
    setToastMessage('You are now offline');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // update active tab when URL changes
  useEffect(() => {
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    if (['deliveries','history','earnings','profile'].includes(last)) {
      setActiveTab(last);
    } else {
      setActiveTab('deliveries');
    }
  }, [location.pathname]);

  const getStatusBadge = (status) => {
    const badges = {
      'pending': { color: '#ffc107', text: 'Pending' },
      'accepted': { color: '#17a2b8', text: 'Accepted' },
      'in-transit': { color: '#007bff', text: 'In Transit' },
      'completed': { color: '#28a745', text: 'Completed' }
    };
    const badge = badges[status] || { color: '#6c757d', text: status };
    
    return (
      <span style={{
        backgroundColor: badge.color,
        color: 'white',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600'
      }}>
        {badge.text}
      </span>
    );
  };

  return (
    <div style={styles.dashboard}>
      {/* Toast Notification */}
      {showToast && (
        <div style={styles.toastContainer}>
          <div style={styles.toast}>
            <i className="bi bi-info-circle-fill" style={styles.toastIcon}></i>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>🚗 Driver Dashboard</h1>
          <p style={styles.headerSubtitle}>Manage your deliveries and track earnings</p>
        </div>
        <div style={styles.onlineStatus}>
          <span style={styles.statusIndicator}></span>
          <span style={styles.statusText}>Online</span>
          <button 
            style={styles.onlineButton}
            onClick={handleGoOnline}
          >
            Go Online
          </button>
          <button 
            style={styles.offlineButton}
            onClick={handleGoOffline}
          >
            Go Offline
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>📦</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>{driverStats.totalDeliveries}</h3>
            <p style={styles.statLabel}>Total Deliveries</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>✅</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>{driverStats.completedDeliveries}</h3>
            <p style={styles.statLabel}>Completed</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏳</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>{driverStats.pendingDeliveries}</h3>
            <p style={styles.statLabel}>Pending</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>💰</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>${driverStats.totalEarnings.toFixed(2)}</h3>
            <p style={styles.statLabel}>Total Earnings</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⭐</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>{driverStats.rating}</h3>
            <p style={styles.statLabel}>Rating</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statIcon}>⏰</div>
          <div style={styles.statInfo}>
            <h3 style={styles.statValue}>{driverStats.onlineHours}h</h3>
            <p style={styles.statLabel}>Online Hours</p>
          </div>
        </div>
      </div>

      {/* Tabs (hide if driver using sidebar) */}
      {!isDriver && (
        <div style={styles.tabsContainer}>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'deliveries' ? styles.activeTab : {})
          }}
          onClick={() => { navigate('deliveries'); }}
        >
          <i className="bi bi-truck" style={styles.tabIcon}></i>
          Active Deliveries
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'history' ? styles.activeTab : {})
          }}
          onClick={() => { navigate('history'); }}
        >
          <i className="bi bi-clock-history" style={styles.tabIcon}></i>
          Delivery History
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'earnings' ? styles.activeTab : {})
          }}
          onClick={() => { navigate('earnings'); }}
        >
          <i className="bi bi-graph-up" style={styles.tabIcon}></i>
          Earnings
        </button>
        <button 
          style={{
            ...styles.tab,
            ...(activeTab === 'profile' ? styles.activeTab : {})
          }}
          onClick={() => { navigate('profile'); }}
        >
          <i className="bi bi-person" style={styles.tabIcon}></i>
          Profile
        </button>
        </div>
      )}

      {/* Tab Content */}
      <div style={styles.tabContent}>
        {/* Active Deliveries Tab */}
        {activeTab === 'deliveries' && (
          <div>
            <h2 style={styles.sectionTitle}>Active Deliveries</h2>
            {deliveries.filter(d => d.status !== 'completed').length === 0 ? (
              <div style={styles.emptyState}>
                <i className="bi bi-truck" style={styles.emptyIcon}></i>
                <h3>No Active Deliveries</h3>
                <p>You're all caught up! Go online to receive new delivery requests.</p>
              </div>
            ) : (
              <div style={styles.deliveriesGrid}>
                {deliveries
                  .filter(d => d.status !== 'completed')
                  .map((delivery) => (
                    <div key={delivery.id} style={styles.deliveryCard}>
                      <div style={styles.deliveryHeader}>
                        <h3 style={styles.orderId}>{delivery.id}</h3>
                        {getStatusBadge(delivery.status)}
                      </div>
                      
                      <div style={styles.restaurantInfo}>
                        <i className="bi bi-shop" style={styles.infoIcon}></i>
                        <span>{delivery.restaurant}</span>
                      </div>
                      
                      <div style={styles.customerInfo}>
                        <i className="bi bi-person" style={styles.infoIcon}></i>
                        <span>{delivery.customer}</span>
                      </div>
                      
                      <div style={styles.addressInfo}>
                        <i className="bi bi-geo-alt" style={styles.infoIcon}></i>
                        <span>{delivery.address}</span>
                      </div>
                      
                      <div style={styles.itemsInfo}>
                        <i className="bi bi-bag" style={styles.infoIcon}></i>
                        <span>{delivery.items.join(', ')}</span>
                      </div>
                      
                      <div style={styles.deliveryMeta}>
                        <span style={styles.metaItem}>
                          <i className="bi bi-telephone"></i> {delivery.phone}
                        </span>
                        <span style={styles.metaItem}>
                          <i className="bi bi-geo"></i> {delivery.distance}
                        </span>
                        <span style={styles.metaItem}>
                          <i className="bi bi-clock"></i> {delivery.estimatedTime}
                        </span>
                      </div>
                      
                      <div style={styles.deliveryActions}>
                        {delivery.status === 'pending' && (
                          <button 
                            style={styles.acceptBtn}
                            onClick={() => handleAcceptDelivery(delivery.id)}
                          >
                            Accept Delivery
                          </button>
                        )}
                        {delivery.status === 'accepted' && (
                          <button 
                            style={styles.startBtn}
                            onClick={() => handleStartDelivery(delivery.id)}
                          >
                            Start Delivery
                          </button>
                        )}
                        {delivery.status === 'in-transit' && (
                          <button 
                            style={styles.completeBtn}
                            onClick={() => handleCompleteDelivery(delivery.id)}
                          >
                            Mark as Completed
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* Delivery History Tab */}
        {activeTab === 'history' && (
          <div>
            <h2 style={styles.sectionTitle}>Delivery History</h2>
            <div style={styles.historyList}>
              {deliveries
                .filter(d => d.status === 'completed')
                .map((delivery) => (
                  <div key={delivery.id} style={styles.historyItem}>
                    <div style={styles.historyHeader}>
                      <span style={styles.historyOrderId}>{delivery.id}</span>
                      <span style={styles.completedBadge}>Completed</span>
                    </div>
                    <div style={styles.historyDetails}>
                      <span><i className="bi bi-shop"></i> {delivery.restaurant}</span>
                      <span><i className="bi bi-person"></i> {delivery.customer}</span>
                      <span><i className="bi bi-clock"></i> {delivery.completedTime}</span>
                      <span><i className="bi bi-cash"></i> {delivery.total}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div style={styles.earningsContainer}>
            <h2 style={styles.sectionTitle}>Earnings Overview</h2>
            
            <div style={styles.earningsSummary}>
              <div style={styles.earningCard}>
                <h4>Today's Earnings</h4>
                <h2 style={styles.earningAmount}>$45.50</h2>
                <p style={styles.earningSubtext}>3 deliveries</p>
              </div>
              
              <div style={styles.earningCard}>
                <h4>This Week</h4>
                <h2 style={styles.earningAmount}>$287.30</h2>
                <p style={styles.earningSubtext}>18 deliveries</p>
              </div>
              
              <div style={styles.earningCard}>
                <h4>This Month</h4>
                <h2 style={styles.earningAmount}>$1,245.80</h2>
                <p style={styles.earningSubtext}>82 deliveries</p>
              </div>
            </div>

            <div style={styles.earningsChart}>
              <h3 style={styles.chartTitle}>Weekly Earnings</h3>
              <div style={styles.chartBars}>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '60px'}}></div>
                  <span>Mon</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '80px'}}></div>
                  <span>Tue</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '45px'}}></div>
                  <span>Wed</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '95px'}}></div>
                  <span>Thu</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '70px'}}></div>
                  <span>Fri</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '110px'}}></div>
                  <span>Sat</span>
                </div>
                <div style={styles.chartBarContainer}>
                  <div style={{...styles.chartBar, height: '90px'}}></div>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={styles.profileContainer}>
            <h2 style={styles.sectionTitle}>Driver Profile</h2>
            
            <div style={styles.profileHeader}>
              <div style={styles.profileAvatar}>
                <i className="bi bi-person-circle" style={styles.avatarIcon}></i>
              </div>
              <div style={styles.profileInfo}>
                <h3>Michael Driver</h3>
                <p><i className="bi bi-envelope"></i> michael.driver@email.com</p>
                <p><i className="bi bi-telephone"></i> +1 (555) 987-6543</p>
                <p><i className="bi bi-car-front"></i> Toyota Corolla - License: ABC123</p>
              </div>
            </div>

            <div style={styles.profileStats}>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatLabel}>Member Since</span>
                <span style={styles.profileStatValue}>Jan 2025</span>
              </div>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatLabel}>Total Deliveries</span>
                <span style={styles.profileStatValue}>{driverStats.totalDeliveries}</span>
              </div>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatLabel}>Acceptance Rate</span>
                <span style={styles.profileStatValue}>98%</span>
              </div>
              <div style={styles.profileStatItem}>
                <span style={styles.profileStatLabel}>On-Time Rate</span>
                <span style={styles.profileStatValue}>96%</span>
              </div>
            </div>

            <button style={styles.editProfileBtn}>
              <i className="bi bi-pencil"></i> Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    minHeight: '100vh',
    backgroundColor: '#f8f5ff',
    padding: '30px'
  },
  
  toastContainer: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    animation: 'slideInRight 0.3s ease'
  },
  
  toast: {
    backgroundColor: '#8a7be0',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 4px 12px rgba(138, 123, 224, 0.3)'
  },
  
  toastIcon: {
    fontSize: '18px'
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  
  headerContent: {
    flex: 1
  },
  
  headerTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#2d2b4e',
    margin: '0 0 10px 0'
  },
  
  headerSubtitle: {
    fontSize: '16px',
    color: '#5f5a8a',
    margin: 0
  },
  
  onlineStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    backgroundColor: 'white',
    padding: '10px 20px',
    borderRadius: '50px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  
  statusIndicator: {
    width: '10px',
    height: '10px',
    backgroundColor: '#28a745',
    borderRadius: '50%',
    display: 'inline-block'
  },
  
  statusText: {
    color: '#2d2b4e',
    fontWeight: '600'
  },
  
  onlineButton: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  offlineButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  
  statCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    boxShadow: '0 4px 12px rgba(138, 123, 224, 0.1)',
    border: '1px solid #e6deff'
  },
  
  statIcon: {
    fontSize: '40px',
    width: '60px',
    height: '60px',
    backgroundColor: '#f0e8ff',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  statInfo: {
    flex: 1
  },
  
  statValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#2d2b4e',
    margin: '0 0 5px 0'
  },
  
  statLabel: {
    fontSize: '14px',
    color: '#5f5a8a',
    margin: 0
  },
  
  tabsContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '2px solid #e6deff',
    paddingBottom: '10px',
    flexWrap: 'wrap'
  },
  
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#5f5a8a',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  
  activeTab: {
    backgroundColor: '#8a7be0',
    color: 'white'
  },
  
  tabIcon: {
    fontSize: '18px'
  },
  
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 12px rgba(138, 123, 224, 0.1)',
    border: '1px solid #e6deff'
  },
  
  sectionTitle: {
    fontSize: '24px',
    color: '#2d2b4e',
    margin: '0 0 20px 0'
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#5f5a8a'
  },
  
  emptyIcon: {
    fontSize: '60px',
    color: '#8a7be0',
    marginBottom: '20px'
  },
  
  deliveriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px'
  },
  
  deliveryCard: {
    backgroundColor: '#f8f5ff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e6deff',
    transition: 'all 0.3s ease'
  },
  
  deliveryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  
  orderId: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#2d2b4e',
    margin: 0
  },
  
  restaurantInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    color: '#2d2b4e'
  },
  
  customerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    color: '#2d2b4e'
  },
  
  addressInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
    color: '#5f5a8a'
  },
  
  itemsInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '15px',
    color: '#5f5a8a'
  },
  
  infoIcon: {
    fontSize: '16px',
    color: '#8a7be0'
  },
  
  deliveryMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
    padding: '10px 0',
    borderTop: '1px solid #e6deff',
    borderBottom: '1px solid #e6deff'
  },
  
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#5f5a8a'
  },
  
  deliveryActions: {
    display: 'flex',
    gap: '10px'
  },
  
  acceptBtn: {
    flex: 1,
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  startBtn: {
    flex: 1,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  completeBtn: {
    flex: 1,
    backgroundColor: '#8a7be0',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  
  historyItem: {
    backgroundColor: '#f8f5ff',
    borderRadius: '10px',
    padding: '15px',
    border: '1px solid #e6deff'
  },
  
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  
  historyOrderId: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#2d2b4e'
  },
  
  completedBadge: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  
  historyDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px',
    fontSize: '14px',
    color: '#5f5a8a'
  },
  
  earningsContainer: {
    // Add earnings styles
  },
  
  earningsSummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  
  earningCard: {
    backgroundColor: '#f8f5ff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #e6deff'
  },
  
  earningAmount: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#8a7be0',
    margin: '10px 0'
  },
  
  earningSubtext: {
    fontSize: '14px',
    color: '#5f5a8a',
    margin: 0
  },
  
  earningsChart: {
    backgroundColor: '#f8f5ff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e6deff'
  },
  
  chartTitle: {
    fontSize: '18px',
    color: '#2d2b4e',
    marginBottom: '20px'
  },
  
  chartBars: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '150px'
  },
  
  chartBarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  
  chartBar: {
    width: '40px',
    backgroundColor: '#8a7be0',
    borderRadius: '8px 8px 0 0',
    transition: 'height 0.3s ease'
  },
  
  profileContainer: {
    // Add profile styles
  },
  
  profileHeader: {
    display: 'flex',
    gap: '30px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  
  profileAvatar: {
    width: '100px',
    height: '100px',
    backgroundColor: '#f0e8ff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  avatarIcon: {
    fontSize: '60px',
    color: '#8a7be0'
  },
  
  profileInfo: {
    flex: 1
  },
  
  profileStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '30px',
    backgroundColor: '#f8f5ff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e6deff'
  },
  
  profileStatItem: {
    textAlign: 'center'
  },
  
  profileStatLabel: {
    display: 'block',
    fontSize: '14px',
    color: '#5f5a8a',
    marginBottom: '5px'
  },
  
  profileStatValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#2d2b4e'
  },
  
  editProfileBtn: {
    backgroundColor: '#8a7be0',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto'
  }
};

export default DriverDashboard;
