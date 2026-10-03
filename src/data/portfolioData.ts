import { Project, SkillCategory, ExperienceItem, Testimonial, ArchitectureLayer } from '../types/portfolio';

import portraitImg from '../assets/images/manish_patel_portrait_1791052448166.jpg';
import fintechImg from '../assets/images/fintech_app_preview_1791052461664.jpg';
import healthImg from '../assets/images/health_app_preview_1791052473033.jpg';
import travelImg from '../assets/images/travel_app_preview_1791052484091.jpg';

export const PERSONAL_INFO = {
  name: 'Manish Patel',
  role: 'Senior Flutter Developer & Mobile Architect',
  email: 'mp0000091@gmail.com',
  github: 'https://github.com/manishpatel-dev',
  linkedin: 'https://linkedin.com/in/manish-patel-flutter',
  location: 'Remote / Global',
  experienceYears: '5+',
  appsShipped: '18+',
  downloadsCount: '1.2M+',
  crashFreeRate: '99.9%',
  avatar: portraitImg,
  bio: 'Specialist in architecting cross-platform enterprise applications for iOS, Android, and Web using Flutter and Dart. Deep expertise in Clean Architecture, reactive state management (BLoC & Riverpod), CI/CD pipelines, and high-framerate custom rendering.',
  status: 'Open to Senior Mobile Engineer roles & High-Impact Consulting',
};

export const PROJECTS: Project[] = [
  {
    id: 'zenith-finance',
    title: 'Zenith Finance',
    tagline: 'Enterprise Multi-Currency Wallet & Crypto Portfolio',
    description:
      'A cross-platform financial suite handling multi-currency accounts, biometric transaction verification, real-time WebSocket order book charts, and instant fiat-to-crypto swaps.',
    category: 'fintech',
    image: fintechImg,
    metrics: {
      downloads: '450K+',
      rating: '4.8 ★',
      crashFree: '99.94%',
    },
    technologies: ['Flutter 3.24', 'Dart', 'BLoC Pattern', 'Dio + Retrofit', 'WebSockets', 'Hive', 'LocalAuth'],
    stateManagement: 'flutter_bloc (Cubit + BLoC)',
    architecture: 'Clean Architecture (Feature-First)',
    highlights: [
      'Sub-16ms chart rendering with CustomPainter canvas optimization',
      'AES-256 local encrypted storage for sensitive cryptographic keys',
      'Offline-first reconciliation engine resolving split-second network dropouts',
      'Dual-engine biometric authorization (FaceID & Fingerprint) via MethodChannels',
    ],
    hasLiveDemo: true,
    githubUrl: 'https://github.com/manishpatel-dev/zenith-finance-flutter',
    storeUrl: 'https://apps.apple.com',
    codeSnippet: {
      filename: 'portfolio_bloc.dart',
      code: `class PortfolioBloc extends Bloc<PortfolioEvent, PortfolioState> {
  final FetchHoldingsUseCase _fetchHoldings;
  final StreamTickerUseCase _streamTicker;
  StreamSubscription? _tickerSub;

  PortfolioBloc({
    required FetchHoldingsUseCase fetchHoldings,
    required StreamTickerUseCase streamTicker,
  })  : _fetchHoldings = fetchHoldings,
        _streamTicker = streamTicker,
        super(const PortfolioInitial()) {
    on<LoadPortfolioEvent>(_onLoadPortfolio);
    on<UpdateLivePriceEvent>(_onUpdatePrice);
  }

  Future<void> _onLoadPortfolio(
    LoadPortfolioEvent event,
    Emitter<PortfolioState> emit,
  ) async {
    emit(const PortfolioLoading());
    final result = await _fetchHoldings(NoParams());
    result.fold(
      (failure) => emit(PortfolioError(failure.message)),
      (holdings) {
        emit(PortfolioLoaded(holdings: holdings));
        _listenToLiveFeed(holdings.symbols);
      },
    );
  }
}`,
    },
  },
  {
    id: 'pulse-health',
    title: 'PulseHealth & Biometrics',
    tagline: 'Wearable Sync & Real-time Metabolic Telemetry',
    description:
      'Continuous health monitoring application connecting with Apple HealthKit and Android Health Connect. Analyzes heart rate variability (HRV), sleep cycles, and caloric burn with custom visual dashboards.',
    category: 'health',
    image: healthImg,
    metrics: {
      downloads: '320K+',
      rating: '4.9 ★',
      crashFree: '99.98%',
    },
    technologies: ['Flutter', 'HealthKit FFI', 'Health Connect', 'flutter_riverpod', 'FlChart', 'WorkManager'],
    stateManagement: 'Riverpod 2.5 (AsyncNotifier)',
    architecture: 'Domain-Driven Design (DDD)',
    highlights: [
      'Native background task synchronization running silent hourly health fetches',
      'Smooth animated ring visualizers computed via parametric bezier math',
      'Zero battery-drain location tracking during outdoor run sessions',
      'HIPAA-compliant client-side telemetry sanitization',
    ],
    hasLiveDemo: true,
    githubUrl: 'https://github.com/manishpatel-dev/pulse-health-flutter',
    storeUrl: 'https://play.google.com',
    codeSnippet: {
      filename: 'health_notifier.dart',
      code: `@riverpod
class VitalsNotifier extends _$VitalsNotifier {
  @override
  FutureOr<VitalsData> build() async {
    final healthRepo = ref.watch(healthRepositoryProvider);
    return healthRepo.getLatestVitals();
  }

  Future<void> syncBiometrics() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      final repo = ref.read(healthRepositoryProvider);
      await repo.requestBackgroundPermissions();
      return repo.getLatestVitals();
    });
  }
}`,
    },
  },
  {
    id: 'nomad-stay',
    title: 'NomadStay Boutique',
    tagline: 'Curated Architectural Stays & Seamless Travel Booking',
    description:
      'Modern hospitality app for booking designer villas and eco-lodges worldwide. Features rich fluid page transitions, interactive vector maps, offline booking receipts, and Apple Pay checkout.',
    category: 'travel',
    image: travelImg,
    metrics: {
      downloads: '280K+',
      rating: '4.7 ★',
      crashFree: '99.91%',
    },
    technologies: ['Flutter 3.24', 'Mapbox GL', 'BLoC', 'Stripe SDK', 'CachedNetworkImage', 'Isar DB'],
    stateManagement: 'flutter_bloc',
    architecture: 'Clean Architecture with Layered UseCases',
    highlights: [
      'Custom Staggered Hero animations during detail view presentation',
      'Vector tile caching allowing offline browsing of saved itineraries',
      'Dynamic currency conversion with background synchronization',
      'Haptic feedback integration on critical user gestures',
    ],
    hasLiveDemo: true,
    githubUrl: 'https://github.com/manishpatel-dev/nomad-stay-flutter',
    storeUrl: 'https://apps.apple.com',
    codeSnippet: {
      filename: 'booking_screen.dart',
      code: `class StayHeroCard extends StatelessWidget {
  final Property property;
  const StayHeroCard({super.key, required this.property});

  @override
  Widget build(BuildContext context) {
    return Hero(
      tag: 'property_\${property.id}',
      flightShuttleBuilder: (flightContext, animation, direction, from, to) {
        return Material(
          color: Colors.transparent,
          child: ScaleTransition(scale: animation, child: to.widget),
        );
      },
      child: ClipRRect(
        borderRadius: BorderRadius.circular(24),
        child: Image.network(property.coverUrl, fit: BoxFit.cover),
      ),
    );
  }
}`,
    },
  },
  {
    id: 'aura-mart',
    title: 'AuraMart Quick-Commerce',
    tagline: 'Ultra-Fast 15-Minute Hyperlocal Delivery',
    description:
      'High-velocity on-demand grocery delivery platform with live rider GPS tracking, sub-millisecond cart updates, dynamic inventory alerts, and instant coupon applications.',
    category: 'ecommerce',
    image: fintechImg,
    metrics: {
      downloads: '180K+',
      rating: '4.6 ★',
      crashFree: '99.89%',
    },
    technologies: ['Flutter', 'Google Maps Flutter', 'Riverpod', 'Firebase Firestore', 'Stripe', 'AudioPlayers'],
    stateManagement: 'StateNotifierProvider',
    architecture: 'Modular Feature Packaging',
    highlights: [
      'Real-time rider marker interpolation with curved polyline routing',
      'Optimistic cart mutation updates preventing UI stutter during high peak loads',
      'Automated push notification channels with localized rich media previews',
    ],
    hasLiveDemo: true,
    githubUrl: 'https://github.com/manishpatel-dev/auramart-flutter',
    storeUrl: 'https://play.google.com',
    codeSnippet: {
      filename: 'cart_notifier.dart',
      code: `class CartNotifier extends StateNotifier<CartState> {
  CartNotifier() : super(CartState.empty());

  void addItem(Product product) {
    final existingIndex = state.items.indexWhere((i) => i.id == product.id);
    if (existingIndex >= 0) {
      final updated = List<CartItem>.from(state.items);
      updated[existingIndex] = updated[existingIndex].increment();
      state = state.copyWith(items: updated);
    } else {
      state = state.copyWith(
        items: [...state.items, CartItem.fromProduct(product)],
      );
    }
  }
}`,
    },
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Flutter & Dart Mastery',
    subtitle: 'Core cross-platform engineering capabilities',
    skills: [
      {
        name: 'Flutter Framework (v3.x)',
        level: 'Expert',
        years: 5,
        description: 'Deep widget lifecycle understanding, custom render objects, RenderBox layouting, and 60/120fps performance tuning.',
      },
      {
        name: 'Dart Language (v3.x)',
        level: 'Expert',
        years: 5,
        description: 'Pattern matching, records, sealed class hierarchies, async streams, isolate concurrency, and extension types.',
      },
      {
        name: 'State Management (BLoC / Cubit)',
        level: 'Expert',
        years: 4,
        description: 'Event-driven unidirectional data flow, stream transformers, testable business logic isolation.',
      },
      {
        name: 'State Management (Riverpod)',
        level: 'Expert',
        years: 3,
        description: 'Compile-time safety, autoDispose lifecycles, AsyncNotifier, family providers, and modern code generation.',
      },
      {
        name: 'Custom Animations & CustomPainter',
        level: 'Advanced',
        years: 4,
        description: 'Physics-based spring simulations, custom canvas shaders, path clipping, and Staggered Animation controllers.',
      },
    ],
  },
  {
    title: 'Mobile Architecture & Patterns',
    subtitle: 'Enterprise-scale code structure & scalability',
    skills: [
      {
        name: 'Clean Architecture & DDD',
        level: 'Expert',
        years: 5,
        description: 'Strict separation into Presentation, Domain (Entities, UseCases), and Data (Models, Data Sources, Repositories).',
      },
      {
        name: 'Dependency Injection',
        level: 'Expert',
        years: 4,
        description: 'Decoupled module registration using get_it, injectable, and Riverpod provider overrides.',
      },
      {
        name: 'Offline-First & Local Persistence',
        level: 'Expert',
        years: 4,
        description: 'Local caching, conflict resolution, SQLite / sqflite, Hive, Isar DB, and SharedPreferences.',
      },
      {
        name: 'REST, GraphQL & WebSockets',
        level: 'Expert',
        years: 5,
        description: 'Robust networking via Dio, interceptors, automatic JWT token refreshing, certificate pinning, and SSE.',
      },
    ],
  },
  {
    title: 'Native Bridges & Hardware',
    subtitle: 'Platform channels & OS-specific integrations',
    skills: [
      {
        name: 'Platform Channels (Method / Event)',
        level: 'Advanced',
        years: 4,
        description: 'Writing custom platform channel bridges for native camera, sensors, and payment SDKs.',
      },
      {
        name: 'iOS & Swift / Xcode',
        level: 'Proficient',
        years: 3,
        description: 'CocoaPods, Swift Package Manager, signing provisioning profiles, BackgroundTasks, and HealthKit.',
      },
      {
        name: 'Android & Kotlin / Gradle',
        level: 'Proficient',
        years: 4,
        description: 'ProGuard/R8 obfuscation, Gradle build flavors, Android 14+ permissions, and Foreground Services.',
      },
      {
        name: 'Push Notifications & Deep Linking',
        level: 'Expert',
        years: 5,
        description: 'Firebase Cloud Messaging (FCM), APNs token resolution, UniLinks, and Universal Links configuration.',
      },
    ],
  },
  {
    title: 'Testing, DevOps & CI/CD',
    subtitle: 'Quality assurance & continuous deployment',
    skills: [
      {
        name: 'Automated Testing (Unit & Widget)',
        level: 'Expert',
        years: 5,
        description: 'Writing Mocktail/Mockito tests, Golden file testing for pixel-perfect UI regression, and integration tests.',
      },
      {
        name: 'Fastlane Automation',
        level: 'Expert',
        years: 4,
        description: 'Automated lane execution for screenshot generation, metadata synchronization, and TestFlight/Beta deployment.',
      },
      {
        name: 'GitHub Actions & Codemagic',
        level: 'Advanced',
        years: 4,
        description: 'Self-hosted and cloud runners for linting, test suites, automated signing, and production release distribution.',
      },
      {
        name: 'App Store & Google Play Releases',
        level: 'Expert',
        years: 5,
        description: 'Managing App Store Connect, Google Play Console, compliance audits, phased rollouts, and crash reporting.',
      },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Lead Mobile Engineer',
    company: 'NovaTech Solutions',
    location: 'Remote',
    period: '2023 — Present',
    current: true,
    type: 'Full-time',
    summary:
      'Leading mobile engineering initiatives across 3 production Flutter applications serving over 700,000 monthly active users.',
    achievements: [
      'Spearheaded migration of legacy cross-platform codebase to Flutter 3.x, reducing overall bundle size by 38% and memory consumption by 24%',
      'Architected unified Clean Architecture template with BLoC and code-gen, cutting feature delivery lead time from 14 days to 4 days',
      'Engineered automated CI/CD pipeline using Fastlane & GitHub Actions that slashed manual release overhead by 12 hours per sprint',
      'Maintained 99.94% crash-free sessions across 1.2M device sessions via Sentry and Firebase Crashlytics telemetry',
    ],
    technologies: ['Flutter 3.x', 'Dart', 'BLoC', 'Fastlane', 'Firebase', 'Clean Architecture', 'GraphQL'],
  },
  {
    id: 'exp-2',
    role: 'Senior Flutter Developer',
    company: 'Apex Mobility Labs',
    location: 'Hybrid',
    period: '2021 — 2023',
    current: false,
    type: 'Full-time',
    summary:
      'Engineered high-concurrency fintech and on-demand delivery apps with real-time tracking, biometric authentication, and offline sync.',
    achievements: [
      'Built a multi-asset cryptocurrency trading app with WebSocket order book updates and sub-16ms chart render performance',
      'Developed native platform channels in Kotlin and Swift for secure biometric authentication and hardware key enclave storage',
      'Mentored 6 junior and mid-level Flutter engineers, establishing strict code review standards and 80%+ test coverage mandate',
    ],
    technologies: ['Flutter', 'Riverpod', 'WebSockets', 'Swift', 'Kotlin', 'SQLite', 'Isar'],
  },
  {
    id: 'exp-3',
    role: 'Mobile Software Engineer',
    company: 'ByteCraft Systems',
    location: 'On-site',
    period: '2019 — 2021',
    current: false,
    type: 'Full-time',
    summary:
      'Built native Android applications and transitioned company core product lines to Flutter for unified iOS and Android maintenance.',
    achievements: [
      'Shipped 4 production applications to Google Play Store and Apple App Store with an average rating of 4.7 stars',
      'Integrated complex third-party SDKs including Stripe, Google Maps, Twilio video calling, and branch.io deep linking',
      'Created custom Material Design 2/3 component libraries reused across 5 company internal products',
    ],
    technologies: ['Flutter', 'Android (Java/Kotlin)', 'Dart', 'Provider', 'REST APIs', 'Firebase'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'David Vance',
    role: 'VP of Engineering',
    company: 'NovaTech Solutions',
    avatarText: 'DV',
    relationship: 'Managed Manish directly',
    content:
      'Manish is among the top 1% of Flutter engineers I have worked with. His mastery of Clean Architecture and BLoC transformed our mobile codebase. He delivered our re-architecture 3 weeks ahead of schedule with flawless 99.9% crash-free stability.',
  },
  {
    id: 't-2',
    name: 'Sarah Lindqvist',
    role: 'Product Lead',
    company: 'Apex Mobility Labs',
    avatarText: 'SL',
    relationship: 'Worked with Manish on Fintech Product',
    content:
      'Working with Manish is a dream for any product manager. He doesn’t just build what is on Figma—he catches edge cases in mobile offline behavior, suggests fluid micro-interactions, and ensures 60fps animations on both budget Android devices and flagship iPhones.',
  },
  {
    id: 't-3',
    name: 'Arjun Mehta',
    role: 'Principal Architect',
    company: 'ByteCraft Systems',
    avatarText: 'AM',
    relationship: 'Supervised Manish on Mobile Projects',
    content:
      'Manish has an extraordinary grasp of Dart internals and native platform channels. When we hit an obscure iOS CoreBluetooth threading bottleneck, Manish wrote a clean Swift MethodChannel bridge that solved the problem within 48 hours.',
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'presentation',
    name: 'Presentation Layer',
    color: '#0284c7', // Sky Blue
    purpose: 'Handles all visual UI widgets, reactive UI state listening, input events, and platform adaptations.',
    components: ['Stateless & Stateful Widgets', 'BLoC / Cubit / Riverpod Consumers', 'Custom Animators & Painters', 'Theme & Navigation Routers'],
    codeExample: `// Presentation Widget
class TransferView extends StatelessWidget {
  const TransferView({super.key});

  @override
  Widget build(BuildContext context) {
    return BlocConsumer<TransferBloc, TransferState>(
      listener: (context, state) {
        if (state is TransferSuccess) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Sent \$state.txId')),
          );
        }
      },
      builder: (context, state) {
        if (state is TransferLoading) {
          return const CircularProgressIndicator.adaptive();
        }
        return TransferForm(onSubmit: (amount) {
          context.read<TransferBloc>().add(SubmitTransferEvent(amount));
        });
      },
    );
  }
}`,
    bestPractices: [
      'Zero business logic in UI widgets',
      'Use const constructors everywhere to optimize widget tree rebuilding',
      'Encapsulate navigation logic into custom route observers',
    ],
  },
  {
    id: 'domain',
    name: 'Domain Layer (Core Logic)',
    color: '#10b981', // Emerald
    purpose: 'The pure Dart heart of the application. Contains business models (Entities) and business rules (UseCases). Completely independent of Flutter or UI.',
    components: ['Entities (Immutable Dart)', 'UseCases (Single Responsibility)', 'Repository Interfaces (Abstract Contracts)', 'Value Objects & Failures'],
    codeExample: `// Pure Dart Domain UseCase
class ExecuteTransferUseCase implements UseCase<TransactionReceipt, TransferParams> {
  final TransferRepository _repository;

  ExecuteTransferUseCase(this._repository);

  @override
  Future<Either<Failure, TransactionReceipt>> call(TransferParams params) async {
    if (params.amount <= 0) {
      return Left(ValidationFailure('Amount must be greater than zero'));
    }
    return await _repository.executeTransfer(
      recipient: params.recipient,
      amount: params.amount,
      memo: params.memo,
    );
  }
}`,
    bestPractices: [
      'Zero import "package:flutter/..." in domain code',
      'One public callable method per UseCase (`call()`)',
      'Use functional error handling (fpdart / Either<Failure, Success>)',
    ],
  },
  {
    id: 'data',
    name: 'Data Layer',
    color: '#f59e0b', // Amber
    purpose: 'Implements repository contracts, handles remote network requests, local database persistence, DTO serialization, and cache validation.',
    components: ['Repository Implementations', 'Remote Data Sources (Dio / Retrofit)', 'Local Data Sources (Hive / Isar / SQLite)', 'Data Transfer Objects (DTOs) with JSON'],
    codeExample: `// Data Layer Repository Implementation
class TransferRepositoryImpl implements TransferRepository {
  final TransferRemoteDataSource _remoteSource;
  final TransferLocalDataSource _localSource;
  final NetworkInfo _networkInfo;

  TransferRepositoryImpl({
    required TransferRemoteDataSource remote,
    required TransferLocalDataSource local,
    required NetworkInfo network,
  })  : _remoteSource = remote,
        _localSource = local,
        _networkInfo = network;

  @override
  Future<Either<Failure, TransactionReceipt>> executeTransfer(...) async {
    if (!await _networkInfo.isConnected) {
      return Left(NetworkFailure('No active internet connection'));
    }
    try {
      final dto = await _remoteSource.postTransfer(...);
      await _localSource.cacheReceipt(dto);
      return Right(dto.toDomainEntity());
    } on ServerException catch (e) {
      return Left(ServerFailure(e.message));
    }
  }
}`,
    bestPractices: [
      'Separate Data Models (DTOs) with `fromJson` from Domain Entities',
      'Isolate all network, local DB, and hardware calls behind interfaces',
      'Centralize HTTP interceptors for automatic authentication token refresh',
    ],
  },
];
