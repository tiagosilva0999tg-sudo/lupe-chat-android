import React, { useState } from 'react';
import {
  SafeAreaView, View, Text, ScrollView, TouchableOpacity,
  TextInput, Image, StyleSheet, StatusBar, Alert
} from 'react-native';

const PURPLE = '#7047EB';
const users = [
  { name: 'Você', color: '#D9CCFF', initial: '+' },
  { name: 'mariana', color: '#FFC9D8', initial: 'M' },
  { name: 'pedro', color: '#C9E8FF', initial: 'P' },
  { name: 'annalu', color: '#FFE0B8', initial: 'A' },
  { name: 'gui', color: '#C8EBD8', initial: 'G' },
  { name: 'bia', color: '#F4D1FF', initial: 'B' },
];

const initialPosts = [
  { id: 1, user: 'mariana', place: 'Praia • há 20 min', color: '#F5C6D6', title: 'Um dia lindo para guardar na memória ✨', likes: 128, liked: false, initial: 'M' },
  { id: 2, user: 'pedro', place: 'Centro • há 1 h', color: '#B8DDF4', title: 'Curtindo o fim de tarde! ☀️', likes: 86, liked: false, initial: 'P' },
];

function Avatar({ initial, color, size = 48 }) {
  return <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
    <Text style={{ fontSize: size * 0.38, color: '#38256F', fontWeight: '800' }}>{initial}</Text>
  </View>;
}

export default function App() {
  const [tab, setTab] = useState('Início');
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const toggleLike = (id) => setPosts(current => current.map(p =>
    p.id === id ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p
  ));

  const addPost = () => Alert.alert('Nova publicação', 'A próxima etapa será conectar a galeria e o envio de fotos e vídeos.');
  const openStory = (name) => Alert.alert('Story', name === 'Você' ? 'Adicione seu primeiro story na próxima etapa.' : `Story de ${name}`);

  const Header = () => <View style={styles.header}>
    <Text style={styles.logo}>LUPE <Text style={{ color: PURPLE }}>CHAT</Text></Text>
    <View style={styles.headerActions}>
      <TouchableOpacity onPress={addPost}><Text style={styles.headerIcon}>＋</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setTab('Mensagens')}><Text style={styles.headerIcon}>♡</Text></TouchableOpacity>
    </View>
  </View>;

  const Home = () => <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.storiesRow}>
      {users.map((u, i) => <TouchableOpacity key={u.name} style={styles.story} onPress={() => openStory(u.name)}>
        <View style={[styles.storyRing, { borderColor: i === 0 ? '#D9D3E8' : PURPLE }]}>
          <Avatar initial={u.initial} color={u.color} size={58} />
        </View>
        <Text style={styles.storyName}>{u.name}</Text>
      </TouchableOpacity>)}
    </View>
    {posts.map(post => <View key={post.id} style={styles.post}>
      <View style={styles.postHeader}>
        <Avatar initial={post.initial} color={post.color} size={42} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.username}>{post.user}</Text>
          <Text style={styles.muted}>{post.place}</Text>
        </View>
        <Text style={styles.more}>•••</Text>
      </View>
      <View style={[styles.postImage, { backgroundColor: post.color }]}>
        <Text style={styles.imageEmoji}>📸</Text>
        <Text style={styles.imageLabel}>LUPE MOMENTS</Text>
      </View>
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => toggleLike(post.id)}><Text style={[styles.actionIcon, post.liked && { color: '#F04470' }]}>{post.liked ? '♥' : '♡'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Comentários', 'Os comentários serão ativados quando o aplicativo tiver seu banco de dados.') }><Text style={styles.actionIcon}>◯</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Compartilhar', 'Compartilhamento será conectado na próxima etapa.')}><Text style={styles.actionIcon}>➤</Text></TouchableOpacity>
      </View>
      <Text style={styles.likes}>{post.likes} curtidas</Text>
      <Text style={styles.caption}><Text style={styles.username}>{post.user} </Text>{post.title}</Text>
      <Text style={styles.muted}>Ver todos os comentários</Text>
    </View>)}
    <View style={{ height: 20 }} />
  </ScrollView>;

  const Messages = () => <View style={styles.page}>
    <Text style={styles.pageTitle}>Mensagens</Text>
    <TextInput value={search} onChangeText={setSearch} placeholder="Pesquisar conversas" style={styles.search} />
    {['Mariana Costa', 'Pedro Henrique', 'Ana Luiza', 'Gui Santos'].filter(n => n.toLowerCase().includes(search.toLowerCase())).map((n, i) =>
      <TouchableOpacity key={n} style={styles.chatRow} onPress={() => Alert.alert(n, 'A conversa privada será conectada ao sistema de mensagens na próxima etapa.')}>
        <Avatar initial={n[0]} color={['#FFC9D8','#C9E8FF','#FFE0B8','#C8EBD8'][i % 4]} size={52} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.username}>{n}</Text>
          <Text style={styles.muted}>Toque para abrir a conversa</Text>
        </View>
        <Text style={{ color: PURPLE, fontSize: 20 }}>›</Text>
      </TouchableOpacity>
    )}
  </View>;

  const Profile = () => <View style={styles.page}>
    <View style={styles.profileTop}>
      <Avatar initial="L" color="#D9CCFF" size={88} />
      <View style={styles.stats}>
        <View><Text style={styles.statNum}>{posts.length}</Text><Text style={styles.muted}>Posts</Text></View>
        <View><Text style={styles.statNum}>120</Text><Text style={styles.muted}>Seguidores</Text></View>
        <View><Text style={styles.statNum}>98</Text><Text style={styles.muted}>Seguindo</Text></View>
      </View>
    </View>
    <Text style={styles.profileName}>Seu nome</Text>
    <Text style={styles.muted}>@seuusuario</Text>
    <Text style={{ marginTop: 10, color: '#444' }}>Bem-vindo ao meu LUPE CHAT! 💜</Text>
    <TouchableOpacity style={styles.editButton} onPress={() => Alert.alert('Editar perfil', 'A edição de perfil será ativada na próxima etapa.')}><Text style={styles.editText}>Editar perfil</Text></TouchableOpacity>
    <View style={styles.emptyGrid}><Text style={{ fontSize: 36 }}>▦</Text><Text style={styles.muted}>Suas publicações aparecerão aqui</Text></View>
  </View>;

  const Reels = () => <View style={[styles.page, styles.center]}>
    <Text style={{ fontSize: 58 }}>▶</Text><Text style={styles.pageTitle}>LUPE Reels</Text>
    <Text style={styles.muted}>Vídeos curtos, diversão e criatividade.</Text>
    <TouchableOpacity style={styles.primaryButton} onPress={() => Alert.alert('Criar Reel', 'O envio de vídeos será ativado na próxima etapa.')}><Text style={styles.primaryText}>＋ Criar Reel</Text></TouchableOpacity>
  </View>;

  const Explore = () => <View style={styles.page}>
    <Text style={styles.pageTitle}>Explorar</Text>
    <TextInput value={search} onChangeText={setSearch} placeholder="Buscar pessoas e publicações" style={styles.search} />
    <Text style={styles.muted}>Sugestões para você</Text>
    {['Mariana Costa', 'Pedro Henrique', 'Ana Luiza'].filter(n => n.toLowerCase().includes(search.toLowerCase())).map((n, i) =>
      <View key={n} style={styles.chatRow}>
        <Avatar initial={n[0]} color={['#FFC9D8','#C9E8FF','#FFE0B8'][i]} />
        <Text style={[styles.username, { flex: 1, marginLeft: 12 }]}>{n}</Text>
        <TouchableOpacity style={styles.followButton} onPress={() => Alert.alert('Seguir', `Você poderá seguir ${n} quando as contas estiverem conectadas.`)}><Text style={styles.followText}>Seguir</Text></TouchableOpacity>
      </View>
    )}
  </View>;

  const screens = {
    'Início': <Home />, 'Explorar': <Explore />, 'Reels': <Reels />,
    'Mensagens': <Messages />, 'Perfil': <Profile />
  };

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <Header />
    <View style={{ flex: 1 }}>{screens[tab]}</View>
    <View style={styles.bottomNav}>
      {[['Início','⌂'],['Explorar','⌕'],['Reels','▶'],['Mensagens','✉'],['Perfil','○']].map(([label, icon]) =>
        <TouchableOpacity key={label} style={styles.navItem} onPress={() => setTab(label)}>
          <Text style={[styles.navIcon, tab === label && { color: PURPLE }]}>{icon}</Text>
          <Text style={[styles.navLabel, tab === label && { color: PURPLE, fontWeight: '800' }]}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { height: 58, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#F0EDF7' },
  logo: { fontSize: 23, fontWeight: '900', letterSpacing: -0.8, color: '#20163F' },
  headerActions: { flexDirection: 'row', gap: 20 },
  headerIcon: { fontSize: 28, color: '#241A42' },
  storiesRow: { flexDirection: 'row', paddingVertical: 14, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: '#F2EFF7' },
  story: { alignItems: 'center', width: 76 },
  storyRing: { borderWidth: 2.5, borderRadius: 36, padding: 3 },
  avatar: { alignItems: 'center', justifyContent: 'center' },
  storyName: { fontSize: 11, color: '#403A4D', marginTop: 5 },
  post: { paddingBottom: 16, borderBottomWidth: 7, borderBottomColor: '#F7F6FA' },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  username: { fontWeight: '800', color: '#262133', fontSize: 13 },
  muted: { color: '#918B9E', fontSize: 11, marginTop: 3 },
  more: { fontSize: 20, color: '#5D5669', paddingHorizontal: 8 },
  postImage: { height: 300, alignItems: 'center', justifyContent: 'center' },
  imageEmoji: { fontSize: 70 },
  imageLabel: { color: '#FFFFFF', fontWeight: '900', letterSpacing: 3, marginTop: 8 },
  postActions: { flexDirection: 'row', paddingHorizontal: 14, paddingTop: 8, gap: 18 },
  actionIcon: { fontSize: 28, color: '#292238' },
  likes: { fontSize: 12, fontWeight: '800', marginLeft: 14, marginTop: 2, color: '#282236' },
  caption: { fontSize: 12, color: '#403A4D', marginHorizontal: 14, marginTop: 5 },
  page: { flex: 1, padding: 20 },
  pageTitle: { fontSize: 25, fontWeight: '900', color: '#241A42', marginBottom: 18 },
  search: { backgroundColor: '#F4F1FA', borderRadius: 12, paddingHorizontal: 15, paddingVertical: 12, marginBottom: 18, fontSize: 14 },
  chatRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F2EFF7' },
  profileTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 },
  stats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  statNum: { fontWeight: '900', fontSize: 18, textAlign: 'center', color: '#241A42' },
  profileName: { fontWeight: '900', color: '#241A42', marginTop: 18 },
  editButton: { borderWidth: 1, borderColor: '#DED7EF', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 18 },
  editText: { fontWeight: '800', color: '#4C398A' },
  emptyGrid: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  center: { alignItems: 'center', justifyContent: 'center' },
  primaryButton: { backgroundColor: PURPLE, paddingHorizontal: 22, paddingVertical: 13, borderRadius: 12, marginTop: 22 },
  primaryText: { color: '#FFFFFF', fontWeight: '800' },
  followButton: { backgroundColor: PURPLE, borderRadius: 9, paddingHorizontal: 16, paddingVertical: 8 },
  followText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  bottomNav: { height: 62, borderTopWidth: 1, borderTopColor: '#EEEAF5', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#FFFFFF' },
  navItem: { alignItems: 'center', justifyContent: 'center', minWidth: 54 },
  navIcon: { fontSize: 23, color: '#817A8E' },
  navLabel: { fontSize: 9, color: '#817A8E', marginTop: 2 }
});