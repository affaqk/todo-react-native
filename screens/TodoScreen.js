import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialTodos = [
  { id: '1', text: 'Buy groceries', completed: false },
  { id: '2', text: 'Walk the dog', completed: false },
  { id: '3', text: 'Read a book', completed: true },
];

export default function TodoScreen() {
  const [todos, setTodos] = useState(initialTodos);
  const [inputText, setInputText] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const addTodo = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now().toString(), text: trimmed, completed: false }]);
    setInputText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const openEdit = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTodos(todos.map(t => t.id === editTodo.id ? { ...t, text: trimmed } : t));
    setEditModalVisible(false);
    setEditTodo(null);
    setEditText('');
  };

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Todos</Text>
      <Text style={styles.subtitle}>{remaining} task{remaining !== 1 ? 's' : ''} remaining</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor="#aaa"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addBtn} onPress={addTodo}>
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity style={styles.checkbox} onPress={() => toggleTodo(item.id)}>
              <View style={[styles.checkboxInner, item.completed && styles.checkboxChecked]}>
                {item.completed && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>

            <Text style={[styles.todoText, item.completed && styles.todoTextDone]}>
              {item.text}
            </Text>

            <TouchableOpacity style={styles.actionBtn} onPress={() => openEdit(item)}>
              <Text style={styles.editIcon}>✎</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No todos yet. Add one above!</Text>}
      />

      <Modal visible={editModalVisible} transparent animationType="fade">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              onSubmitEditing={saveEdit}
              returnKeyType="done"
            />
            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, styles.saveBtn]} onPress={saveEdit}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1a1a1a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  addBtn: {
    backgroundColor: '#4f46e5',
    borderRadius: 12,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 32,
  },
  list: { flex: 1 },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  checkbox: { padding: 2 },
  checkboxInner: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4f46e5',
    borderColor: '#4f46e5',
  },
  checkmark: { color: '#fff', fontSize: 13, fontWeight: '700' },
  todoText: { flex: 1, fontSize: 16, color: '#1a1a1a' },
  todoTextDone: { textDecorationLine: 'line-through', color: '#aaa' },
  actionBtn: { padding: 4 },
  editIcon: { fontSize: 18, color: '#4f46e5' },
  deleteIcon: { fontSize: 16, color: '#ef4444' },
  emptyText: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 20,
  },
  modalBtns: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelBtn: { backgroundColor: '#f0f0f0' },
  cancelBtnText: { color: '#555', fontWeight: '600', fontSize: 15 },
  saveBtn: { backgroundColor: '#4f46e5' },
  saveBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
