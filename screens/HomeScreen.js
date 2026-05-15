import { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput,
  TouchableOpacity, FlatList, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { restaurants, categories } from '../data/restaurants';
import { useCart } from '../context/CartContext';

const FEATURED = restaurants.filter(r => r.isOpen).slice(0, 3);

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { totalItems } = useCart();

  const filtered = restaurants.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q);
    const matchCat = activeCategory === 'All' || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filtered}
        keyExtractor={r => r.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.deliverLabel}>Deliver to</Text>
                <TouchableOpacity style={styles.locationRow}>
                  <Text style={styles.locationText}>📍 New York, NY</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.iconBtn}>
                  <Text style={styles.iconBtnText}>🔔</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Cart')}>
                  <Text style={styles.iconBtnText}>🛒</Text>
                  {totalItems > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{totalItems}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Search */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search restaurants or dishes..."
                placeholderTextColor="#bbb"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Text style={styles.clearIcon}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Featured banner */}
            {!search && activeCategory === 'All' && (
              <>
                <Text style={styles.sectionLabel}>🔥 Featured</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
                  {FEATURED.map(r => (
                    <TouchableOpacity
                      key={r.id}
                      style={styles.featuredCard}
                      onPress={() => navigation.navigate('Restaurant', { restaurant: r })}
                      activeOpacity={0.88}
                    >
                      <LinearGradient colors={r.coverColor} style={styles.featuredGrad}>
                        <Text style={styles.featuredEmoji}>{r.coverEmoji}</Text>
                        <View style={styles.featuredInfo}>
                          <Text style={styles.featuredName}>{r.name}</Text>
                          <Text style={styles.featuredMeta}>⭐ {r.rating}  ·  🕐 {r.deliveryTime} min</Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </>
            )}

            {/* Category chips */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={styles.catContent}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.chip, activeCategory === cat && styles.chipActive]}
                  onPress={() => setActiveCategory(cat)}
                >
                  <Text style={[styles.chipText, activeCategory === cat && styles.chipTextActive]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionLabel}>
              {filtered.length} Restaurant{filtered.length !== 1 ? 's' : ''} near you
            </Text>
          </>
        }
        renderItem={({ item }) => <RestaurantCard restaurant={item} onPress={() => navigation.navigate('Restaurant', { restaurant: item })} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>Try a different search or category</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function RestaurantCard({ restaurant: r, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <LinearGradient colors={r.coverColor} style={styles.cardCover}>
        <Text style={styles.cardCoverEmoji}>{r.coverEmoji}</Text>
        {!r.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
        <View style={styles.tagsRow}>
          {r.tags.map(t => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardName}>{r.name}</Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>⭐ {r.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardCuisine}>{r.cuisine}</Text>
        <View style={styles.cardMeta}>
          <MetaPill icon="🕐" text={`${r.deliveryTime} min`} />
          <MetaPill icon="🛵" text={`$${r.deliveryFee.toFixed(2)} delivery`} />
          <MetaPill icon="📦" text={`Min $${r.minOrder}`} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

function MetaPill({ icon, text }) {
  return (
    <View style={styles.metaPill}>
      <Text style={styles.metaText}>{icon} {text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  listContent: { paddingBottom: 20 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 18, paddingTop: 8, paddingBottom: 12 },
  deliverLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 16, fontWeight: '700', color: '#1a1a1a' },
  chevron: { fontSize: 20, color: '#FF385C', fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 8 },
  iconBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 },
  iconBtnText: { fontSize: 20 },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#FF385C', borderRadius: 9, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },

  searchBox: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 18, marginBottom: 18, backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3 },
  searchIcon: { fontSize: 18 },
  searchInput: { flex: 1, fontSize: 15, color: '#1a1a1a' },
  clearIcon: { fontSize: 15, color: '#bbb' },

  sectionLabel: { fontSize: 17, fontWeight: '700', color: '#1a1a1a', marginHorizontal: 18, marginBottom: 12 },

  featuredScroll: { paddingLeft: 18, marginBottom: 20 },
  featuredCard: { width: 230, borderRadius: 16, overflow: 'hidden', marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  featuredGrad: { height: 130, padding: 14, justifyContent: 'space-between' },
  featuredEmoji: { fontSize: 40 },
  featuredInfo: {},
  featuredName: { fontSize: 16, fontWeight: '800', color: '#fff' },
  featuredMeta: { fontSize: 12, color: '#ffffffcc', marginTop: 2 },

  catScroll: { marginBottom: 16 },
  catContent: { paddingHorizontal: 18, gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#eee' },
  chipActive: { backgroundColor: '#FF385C', borderColor: '#FF385C' },
  chipText: { fontSize: 13, fontWeight: '600', color: '#777' },
  chipTextActive: { color: '#fff' },

  card: { marginHorizontal: 18, marginBottom: 16, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.09, shadowRadius: 10, elevation: 4 },
  cardCover: { height: 150, justifyContent: 'flex-end', alignItems: 'center' },
  cardCoverEmoji: { fontSize: 64, position: 'absolute', top: '50%', marginTop: -40 },
  closedOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#00000066', justifyContent: 'center', alignItems: 'center' },
  closedText: { color: '#fff', fontWeight: '700', fontSize: 18, letterSpacing: 1 },
  tagsRow: { flexDirection: 'row', gap: 6, position: 'absolute', top: 10, left: 10 },
  tag: { backgroundColor: '#ffffffdd', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10 },
  tagText: { fontSize: 11, fontWeight: '700', color: '#1a1a1a' },

  cardBody: { padding: 14 },
  cardTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 17, fontWeight: '700', color: '#1a1a1a' },
  ratingPill: { backgroundColor: '#fff7ed', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#FF6B35' },
  cardCuisine: { fontSize: 13, color: '#888', marginBottom: 10 },
  cardMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  metaPill: { backgroundColor: '#f5f5f5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  metaText: { fontSize: 11, color: '#666' },

  empty: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 56, marginBottom: 14 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1a1a', marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: '#aaa' },
});
