import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'auth/signin_page.dart';
import 'dashboard/dashboard.dart';
import 'services/reward_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const PantryApp());
}

class PantryApp extends StatelessWidget {
  const PantryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Pantry Inventory',
      theme: ThemeData(primarySwatch: Colors.green),
      home: const AuthGate(),
    );
  }
}

class AuthGate extends StatelessWidget {
  const AuthGate({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (_, snapshot) {
        if (snapshot.hasData) {
          RewardService.initUser();
          return const Dashboard();
        }
        return const SignInPage();
      },
    );
  }
}
import 'package:flutter/material.dart';
import '../ocr/bill_scanner.dart';
import '../inventory/add_item.dart';
import '../inventory/inventory_list.dart';
import '../recipes/recipes_page.dart';
import '../rewards/rewards_page.dart';
import '../rewards/leaderboard_page.dart';
import '../rewards/badges_page.dart';
import '../rewards/redeem_rewards_page.dart';

class Dashboard extends StatelessWidget {
  const Dashboard({super.key});

  Widget tile(BuildContext c, String t, Widget p) {
    return GestureDetector(
      onTap: () => Navigator.push(c, MaterialPageRoute(builder: (_) => p)),
      child: Card(
        elevation: 4,
        child: Center(child: Text(t, style: const TextStyle(fontSize: 16))),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Dashboard")),
      body: GridView.count(
        crossAxisCount: 2,
        children: [
          tile(context, "Scan Bill", BillScanner()),
          tile(context, "Add Item", AddItem()),
          tile(context, "Inventory", InventoryList()),
          tile(context, "AI Recipes", RecipesPage()),
          tile(context, "Rewards", RewardsPage()),
          tile(context, "Leaderboard", LeaderboardPage()),
          tile(context, "Badges", BadgesPage()),
          tile(context, "Redeem", RedeemRewardsPage()),
        ],
      ),
    );
  }
}
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class RewardService {
  static final _db = FirebaseFirestore.instance;
  static final _auth = FirebaseAuth.instance;

  static Future<void> initUser() async {
    final uid = _auth.currentUser!.uid;
    final ref = _db.collection("users").doc(uid);

    if (!(await ref.get()).exists) {
      await ref.set({
        "email": _auth.currentUser!.email,
        "points": 0,
        "badge": "Newbie",
      });
    }
  }

  static Future<void> addPoints(int value) async {
    final uid = _auth.currentUser!.uid;
    final ref = _db.collection("users").doc(uid);

    await ref.update({"points": FieldValue.increment(value)});
    await _updateBadge(uid);
  }

  static Future<void> _updateBadge(String uid) async {
    final snap = await _db.collection("users").doc(uid).get();
    final points = snap["points"];

    String badge = "Newbie";
    if (points >= 200) badge = "Gold Saver";
    else if (points >= 100) badge = "Silver Saver";
    else if (points >= 50) badge = "Bronze Saver";

    await _db.collection("users").doc(uid).update({"badge": badge});
  }
}
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

class BillScanner extends StatefulWidget {
  @override
  State<BillScanner> createState() => _BillScannerState();
}

class _BillScannerState extends State<BillScanner> {
  String text = "";

  Future<void> scan() async {
    final img = await ImagePicker().pickImage(source: ImageSource.camera);
    if (img == null) return;

    final input = InputImage.fromFilePath(img.path);
    final recognizer = TextRecognizer(script: TextRecognitionScript.latin);
    final result = await recognizer.processImage(input);

    setState(() => text = result.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Bill Scanner")),
      body: Column(
        children: [
          ElevatedButton(onPressed: scan, child: const Text("Scan Bill")),
          Expanded(child: SingleChildScrollView(child: Text(text))),
        ],
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:google_mlkit_text_recognition/google_mlkit_text_recognition.dart';

class BillScanner extends StatefulWidget {
  @override
  State<BillScanner> createState() => _BillScannerState();
}

class _BillScannerState extends State<BillScanner> {
  String text = "";

  Future<void> scan() async {
    final img = await ImagePicker().pickImage(source: ImageSource.camera);
    if (img == null) return;

    final input = InputImage.fromFilePath(img.path);
    final recognizer = TextRecognizer(script: TextRecognitionScript.latin);
    final result = await recognizer.processImage(input);

    setState(() => text = result.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Bill Scanner")),
      body: Column(
        children: [
          ElevatedButton(onPressed: scan, child: const Text("Scan Bill")),
          Expanded(child: SingleChildScrollView(child: Text(text))),
        ],
      ),
    );
  }
}
