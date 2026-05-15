import { StyleSheet, Text, View, TouchableOpacity, SectionList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function RestaurantScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { addItem, removeItem, getQty, totalItems, subtotal, fromRestaurant } = useCart();
  const { user } = useAuth();

  const handleAdd = (item) => {
    if (!user) {
      Alert.alert(
        '🔒 Login Required',
        'Please sign in to add items to your cart.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign In', onPress: () => navigation.navigate('Login') },
        ]
      );
      return;
    }
    addItem(item, restaurant);
  };

  const cartIsFromHere = fromRestaurant?.id === restaurant.id;

  const sections = restaurant.menu.map(section => ({
    title: section.category,
    data: section.items,
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Cover */}
            <View style={styles.cover}>
              <LinearGradient colors={restaurant.coverColor} style={styles.coverGrad}>
                <Text style={styles.coverEmoji}>{restaurant.coverEmoji}</Text>
              </LinearGradient>

              {/* Back button */}
              <SafeAreaView style={styles.topBar} edges={['top']}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                  <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
              </SafeAreaView>

              {!restaurant.isOpen && (
                <View style={styles.closedOverlay}>
                  <Text style={styles.closedText}>Currently Closed</Text>
                </View>
              )}
            </View>

            {/* Info card */}
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
                  <Text style={styles.reviewCount}> ({restaurant.reviewCount})</Text>
                </View>
              </View>
              <Text style={styles.cuisine}>{restaurant.cuisine}</Text>

              <View style={styles.metaRow}>
                <InfoChip icon="🕐" text={`${restaurant.deliveryTime} min`} />
                <InfoChip icon="🛵" text={`$${restaurant.deliveryFee.toFixed(2)} delivery`} />
                <InfoChip icon="📦" text={`Min $${restaurant.minOrder}`} />
              </View>
            </View>

            <Text style={styles.menuHeading}>Menu</Text>
          </>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => {
          const qty = getQty(item.id);
          return (
            <View style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDesc} numberOfLines={2}>{item.description}</Text>
                  <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </View>

              {qty === 0 ? (
                <TouchableOpacity
                  style={[styles.addBtn, !restaurant.isOpen && styles.addBtnDisabled]}
                  onPress={() => restaurant.isOpen && handleAdd(item)}
                  disabled={!restaurant.isOpen}
                >
                  <Text style={styles.addBtnText}>+ Add</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.qtyControl}>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => removeItem(item.id)}>
                    <Text style={styles.qtyBtnText}>−</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtyNum}>{qty}</Text>
                  <TouchableOpacity style={styles.qtyBtn} onPress={() => handleAdd(item)}>
                    <Text style={styles.qtyBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />

      {/* Floating cart bar */}
      {cartIsFromHere && totalItems > 0 && (
        <View style={styles.cartBar}>
          <TouchableOpacity style={styles.cartBtn} onPress={() => navigation.navigate('Cart')}>
            <View style={styles.cartBtnBadge}>
              <Text style={styles.cartBtnBadgeText}>{totalItems}</Text>
            </View>
            <Text style={styles.cartBtnLabel}>View Cart</Text>
            <Text style={styles.cartBtnPrice}>${subtotal.toFixed(2)}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

function InfoChip({ icon, text }) {
  return (
    <View style={styles.infoChip}>
      <Text style={styles.infoChipText}>{icon} {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  listContent: { paddingBottom: 110 },

  cover: { height: 240, position: 'relative' },
  coverGrad: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  coverEmoji: { fontSize: 90 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0 },
  backBtn: { margin: 14, width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffffdd', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 4 },
  backIcon: { fontSize: 28, color: '#1a1a1a', lineHeight: 34, marginLeft: -2 },
  closedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#00000055', justifyContent: 'center', alignItems: 'center' },
  closedText: { color: '#fff', fontSize: 22, fontWeight: '800', letterSpacing: 1 },

  infoCard: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: -20, borderRadius: 20, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 6, marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  restaurantName: { fontSize: 22, fontWeight: '800', color: '#1a1a1a', flex: 1, marginRight: 10 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff7ed', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },
  reviewCount: { fontSize: 11, color: '#aaa' },
  cuisine: { fontSize: 13, color: '#888', marginBottom: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  infoChip: { backgroundColor: '#f5f5f5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  infoChipText: { fontSize: 12, color: '#555', fontWeight: '500' },

  menuHeading: { fontSize: 20, fontWeight: '800', color: '#1a1a1a', marginHorizontal: 18, marginTop: 6, marginBottom: 4 },

  sectionHeader: { paddingHorizontal: 18, paddingTop: 18, paddingBottom: 8 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#FF385C', textTransform: 'uppercase', letterSpacing: 0.8 },

  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 10, borderRadius: 16, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2, gap: 12 },
  menuItemLeft: { flex: 1, flexDirection: 'row', gap: 12 },
  menuEmoji: { fontSize: 44, width: 56, textAlign: 'center' },
  menuItemInfo: { flex: 1 },
  menuItemName: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', marginBottom: 3 },
  menuItemDesc: { fontSize: 12, color: '#999', lineHeight: 17, marginBottom: 6 },
  menuItemPrice: { fontSize: 15, fontWeight: '800', color: '#FF385C' },

  addBtn: { backgroundColor: '#FF385C', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  addBtnDisabled: { backgroundColor: '#ccc' },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#fff0f3', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 4 },
  qtyBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF385C', alignItems: 'center', justifyContent: 'center' },
  qtyBtnText: { color: '#fff', fontSize: 18, lineHeight: 22, fontWeight: '700' },
  qtyNum: { fontSize: 15, fontWeight: '700', color: '#1a1a1a', minWidth: 20, textAlign: 'center' },

  cartBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', paddingHorizontal: 18, paddingTop: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: '#f0f0f0', shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 10 },
  cartBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FF385C', borderRadius: 16, paddingVertical: 15, paddingHorizontal: 18 },
  cartBtnBadge: { backgroundColor: '#fff', borderRadius: 12, width: 24, height: 24, alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  cartBtnBadgeText: { color: '#FF385C', fontWeight: '800', fontSize: 12 },
  cartBtnLabel: { flex: 1, color: '#fff', fontWeight: '700', fontSize: 16 },
  cartBtnPrice: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
