import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoginRequired from '../components/LoginRequired';

export default function CartScreen({ navigation }) {
  const { user } = useAuth();
  const { items, fromRestaurant, addItem, removeItem, clearCart, subtotal } = useCart();

  if (!user) {
    return (
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <Text style={styles.header}>Your Cart</Text>
        <LoginRequired navigation={navigation} message="Sign in to view your cart and place orders." />
      </SafeAreaView>
    );
  }
  const [orderPlaced, setOrderPlaced] = useState(false);

  const deliveryFee = fromRestaurant?.deliveryFee ?? 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order',
      `Place order for $${total.toFixed(2)} from ${fromRestaurant?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order', onPress: () => {
            clearCart();
            setOrderPlaced(true);
          },
        },
      ]
    );
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Text style={styles.header}>Your Cart</Text>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add items from a restaurant to get started</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Your Cart</Text>

      {fromRestaurant && (
        <View style={styles.restaurantBanner}>
          <Text style={styles.restaurantBannerEmoji}>{fromRestaurant.emoji}</Text>
          <Text style={styles.restaurantBannerName}>{fromRestaurant.name}</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={i => i.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.cartEmoji}>{item.emoji}</Text>
            <View style={styles.cartItemInfo}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>${item.price.toFixed(2)} each</Text>
            </View>
            <View style={styles.qtyControl}>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => removeItem(item.id)}>
                <Text style={styles.qtyBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyNum}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtyBtn} onPress={() => addItem(item, fromRestaurant)}>
                <Text style={styles.qtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cartItemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>
            <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
            <SummaryRow label={`Delivery (${fromRestaurant?.name})`} value={`$${deliveryFee.toFixed(2)}`} />
            <View style={styles.divider} />
            <SummaryRow label="Total" value={`$${total.toFixed(2)}`} bold />

            <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
              <LinearGradient colors={['#FF385C', '#FF6B35']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.orderBtnGrad}>
                <Text style={styles.orderBtnText}>Place Order · ${total.toFixed(2)}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Order success modal */}
      <Modal visible={orderPlaced} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successCard}>
            <Text style={styles.successEmoji}>🎉</Text>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successSub}>Your food is being prepared. Estimated delivery in 30 min.</Text>
            <TouchableOpacity style={styles.successBtn} onPress={() => setOrderPlaced(false)}>
              <Text style={styles.successBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.summaryBold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  header: { fontSize: 26, fontWeight: '800', color: '#1a1a1a', marginHorizontal: 18, marginTop: 10, marginBottom: 16 },

  restaurantBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2, gap: 10 },
  restaurantBannerEmoji: { fontSize: 26 },
  restaurantBannerName: { flex: 1, fontSize: 15, fontWeight: '700', color: '#1a1a1a' },
  clearText: { fontSize: 13, color: '#FF385C', fontWeight: '600' },

  listContent: { paddingHorizontal: 16, paddingBottom: 30 },

  cartItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 12, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2, gap: 10 },
  cartEmoji: { fontSize: 36, width: 48, textAlign: 'center' },
  cartItemInfo: { flex: 1 },
  cartItemName: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', marginBottom: 2 },
  cartItemPrice: { fontSize: 12, color: '#999' },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff0f3', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 4 },
  qtyBtn: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#FF385C', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 16, lineHeight: 20, fontWeight: '700' },
  qtyNum: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', minWidth: 18, textAlign: 'center' },
  cartItemTotal: { fontSize: 15, fontWeight: '800', color: '#FF385C', minWidth: 50, textAlign: 'right' },

  summary: { backgroundColor: '#fff', borderRadius: 18, padding: 18, marginTop: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 4 },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: '#1a1a1a', marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  summaryLabel: { fontSize: 14, color: '#666' },
  summaryValue: { fontSize: 14, color: '#666' },
  summaryBold: { fontWeight: '800', color: '#1a1a1a', fontSize: 16 },
  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 10 },

  orderBtn: { marginTop: 16, borderRadius: 16, overflow: 'hidden', shadowColor: '#FF385C', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 6 },
  orderBtnGrad: { paddingVertical: 16, alignItems: 'center' },
  orderBtnText: { color: '#fff', fontSize: 17, fontWeight: '800', letterSpacing: 0.3 },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 70, marginBottom: 16 },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#1a1a1a', marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#aaa', textAlign: 'center', paddingHorizontal: 40 },

  modalOverlay: { flex: 1, backgroundColor: '#00000055', justifyContent: 'center', paddingHorizontal: 32 },
  successCard: { backgroundColor: '#fff', borderRadius: 20, padding: 28, alignItems: 'center' },
  successEmoji: { fontSize: 60, marginBottom: 14 },
  successTitle: { fontSize: 24, fontWeight: '800', color: '#1a1a1a', marginBottom: 10 },
  successSub: { fontSize: 14, color: '#888', textAlign: 'center', lineHeight: 21, marginBottom: 24 },
  successBtn: { backgroundColor: '#FF385C', borderRadius: 14, paddingHorizontal: 40, paddingVertical: 13 },
  successBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
