const img = (path) => `/private/qurable/${path}`;

const localPrivateProjects = [
  {
    slug: 'qurable',
    client: 'Qurable',
    title: 'Qurable loyalty platform',
    summary:
      'Confidential dashboard explorations for a loyalty and engagement product, focused on performance visibility, coupon behavior, and member operations.',
    status: 'Private portfolio access',
    passwordHint: 'Protected with password access for confidential portfolio review.',
    plannedModules: ['Dashboard', 'Coupons', 'Campaigns', 'Referrals', 'Audiences', 'Settings', 'Locations'],
    modules: [
      {
        slug: 'dashboard',
        title: 'Dashboard',
        summary:
          'The central question was: how does a client know if their loyalty program is actually working? I defined which metrics were actionable versus decorative, and designed the dashboard from that prioritization — campaign performance, coupon behavior, tier distribution, and mission completion. The client can now detect redemption problems in real time without depending on Qurable\'s technical team.',
      },
      {
        slug: 'coupons',
        title: 'Coupons',
        summary:
          'Coupons in Qurable cover real complexity: they are issued, activated, redeemed, registered by code, auto-activated by rules, or redeemed at a portal checkout. Each use case has its own flow. The challenge was designing a coherent system that supports all scenarios without fragmenting the operator experience.',
      },
      {
        slug: 'campaigns',
        title: 'Geofencing',
        summary:
          'Geofencing allows clients to create geographic areas to launch location-based promotions. The design challenge was making a technically complex feature accessible to non-technical teams who operate the manager directly.',
      },
      {
        slug: 'referrals',
        title: 'Referrals',
        summary:
          'I migrated the referral module from an isolated version to one fully integrated within the campaign engine. The change wasn\'t just technical — it meant redefining how clients think about acquisition campaigns and how they connect to the rest of the loyalty program.',
      },
      {
        slug: 'audiences',
        title: 'Audiences',
        summary:
          'Audiences allows creating user segments in three different ways, each with distinct implications for performance and use case. Audiences can be called from campaigns and coupons to target specific actions. I designed the system so that technical complexity stays invisible to the operator.',
      },
    ],
    entries: [
      {
        slug: 'dashboard',
        module: 'dashboard',
        title: 'Dashboard',
        description:
          'Main analytics dashboard with populated campaign insights, coupon performance, tiers distribution, and mission completion modules.',
        image: img('dashboard.png'),
      },
      {
        slug: 'dashboard-empty-state',
        module: 'dashboard',
        title: 'Dashboard empty state',
        description:
          'An empty state is a product decision, not an error state. I designed each empty state as an onboarding opportunity — guiding the client toward the right action instead of showing a blank screen.',
        image: img('dashboard-empty-state.png'),
      },
      {
        slug: 'coupon-book-overview',
        module: 'coupons',
        title: 'Coupons catalog',
        description:
          'Coupon management overview with search, filters, lifecycle states, and table-level actions for active, paused, and pending offers.',
        image: img('coupons/coupon-book-01.png'),
      },
      {
        slug: 'coupon-book-detail',
        module: 'coupons',
        title: 'Coupon detail drawer',
        description:
          'Detailed coupon inspection with media thumbnails, configuration summary, key metrics, and generated coupon book key for operational follow-up.',
        image: img('coupons/coupon-book-02.png'),
      },
      {
        slug: 'coupon-templates',
        module: 'coupons',
        title: 'Coupon templates',
        description:
          'Template selection view for defining audience strategies, discount mechanics, co-branded offers, rewards, and advanced coupon configuration.',
        image: img('coupons/coupon-book-03.png'),
      },
      {
        slug: 'coupon-basic-configuration',
        module: 'coupons',
        title: 'Coupon setup: basic configuration',
        description:
          'Initial coupon setup step for naming the coupon, selecting its type, configuring code behavior, and defining the core benefit structure.',
        image: img('coupons/coupon-book-04.png'),
      },
      {
        slug: 'coupon-validity',
        module: 'coupons',
        title: 'Coupon setup: validity',
        description:
          'Validity and period limit controls for timezone, scheduling, active weekdays, and recurring redemption conditions.',
        image: img('coupons/coupon-book-05.png'),
      },
      {
        slug: 'coupon-usage-rules',
        module: 'coupons',
        title: 'Coupon setup: usage rules',
        description:
          'Usage configuration screen defining per-member and total limits, accrual behavior, and points logic for coupon claiming and redemption.',
        image: img('coupons/coupon-book-06.png'),
      },
      {
        slug: 'coupon-eligibility',
        module: 'coupons',
        title: 'Coupon setup: eligibility',
        description:
          'Audience definition screen combining segment filters, participating locations, and payment methods with a live summary card.',
        image: img('coupons/coupon-book-07.png'),
      },
      {
        slug: 'coupon-media-basic',
        module: 'coupons',
        title: 'Coupon setup: media basics',
        description:
          'Media step for title, description, and initial visual assets, introducing the structure for coupon content and custom attributes.',
        image: img('coupons/coupon-book-08.png'),
      },
      {
        slug: 'coupon-media-expanded',
        module: 'coupons',
        title: 'Coupon setup: media and attributes',
        description:
          'Expanded media configuration with multiple image slots, subtitle support, and structured custom attributes for richer coupon rendering.',
        image: img('coupons/coupon-book-09.png'),
      },
      {
        slug: 'coupon-book-filtered',
        module: 'coupons',
        title: 'Coupons catalog with filters',
        description:
          'Coupon list variant with state filters, search, partner attribution, and table actions for scanning published, draft, and partner offers.',
        image: img('coupons/coupon-book-10.png'),
      },
      {
        slug: 'geofencing-rules-overview',
        module: 'campaigns',
        title: 'Geofencing: rules overview',
        description:
          'Rules screen combining audience, tiers, locations, rewards, and optional conditions for points-per-purchase campaigns.',
        image: img('campaigns/geofencing-02.png'),
      },
      {
        slug: 'geofencing-map-library',
        module: 'campaigns',
        title: 'Geofencing: area library',
        description:
          'Custom area modal with saved geofenced regions, search, and reusable presets layered over the live map.',
        image: img('campaigns/geofencing-03.png'),
      },
      {
        slug: 'geofencing-map-empty',
        module: 'campaigns',
        title: 'Geofencing: empty area state',
        description:
          'Map state prepared for drawing or searching geographic areas before any saved presets are surfaced in the side panel.',
        image: img('campaigns/geofencing-04.png'),
      },
      {
        slug: 'geofencing-map-saved-areas',
        module: 'campaigns',
        title: 'Geofencing: saved areas on map',
        description:
          'Saved geofenced areas displayed alongside the drawing canvas, making it easy to reuse existing polygons and compare coverage.',
        image: img('campaigns/geofencing-05.png'),
      },
      {
        slug: 'geofencing-location-dropdown',
        module: 'campaigns',
        title: 'Geofencing: location selector',
        description:
          'Configuration state with location selection open, showing how teams choose participating places before refining rewards and area logic.',
        image: img('campaigns/geofencing-01.png'),
      },
      {
        slug: 'referrals-list',
        module: 'referrals',
        title: 'Referral campaigns list',
        description:
          'Campaign list focused on referral programs, showing member engagement, time alive, publishing states, and quick actions from the table.',
        image: img('campaigns/referrals/referral-01.png'),
      },
      {
        slug: 'referrals-details',
        module: 'referrals',
        title: 'Referral setup: details',
        description:
          'Initial referral campaign configuration for naming the program, adding descriptive content, and preparing media slots before defining logic.',
        image: img('campaigns/referrals/referral-02.png'),
      },
      {
        slug: 'referrals-trigger',
        module: 'referrals',
        title: 'Referral setup: activation trigger',
        description:
          'Activation step for referral campaigns where teams define the event that starts the program, such as new sign-up or purchase with referral code.',
        image: img('campaigns/referrals/referral-03.png'),
      },
      {
        slug: 'referrals-validity',
        module: 'referrals',
        title: 'Referral setup: validity',
        description:
          'Validity configuration for referral campaigns with start and end dates, no-end toggle, and a live card summary of active settings.',
        image: img('campaigns/referrals/referral-04.png'),
      },
      {
        slug: 'referrals-rules-goal',
        module: 'referrals',
        title: 'Referral setup: rules overview',
        description:
          'Rules screen for defining referral goals, attribution windows, reward types, and code strategy before refining the detailed reward configuration.',
        image: img('campaigns/referrals/referral-05.png'),
      },
      {
        slug: 'referrals-rules-code-strategy',
        module: 'referrals',
        title: 'Referral setup: rewards and code strategy',
        description:
          'Referral rules variant with custom goals, enabled rewards for referrer and referred members, and the selected reusable code behavior.',
        image: img('campaigns/referrals/referral-06.png'),
      },
      {
        slug: 'referrals-insights-empty',
        module: 'referrals',
        title: 'Referral insights empty state',
        description:
          'Insights view before the first referral happens, emphasizing onboarding and setting expectations for future conversion and reward data.',
        image: img('campaigns/referrals/referral-07.png'),
      },
      {
        slug: 'referrals-insights-populated',
        module: 'referrals',
        title: 'Referral insights dashboard',
        description:
          'Populated referral analytics view with KPI cards and funnel visualization tracking exposure, link creation, registrations, purchases, and benefits granted.',
        image: img('campaigns/referrals/referral-08.png'),
      },
      {
        slug: 'audiences-list',
        module: 'audiences',
        title: 'Audience management list',
        description:
          'Audience overview with search, type labels, estimated size, status, usage count, update metadata, and row-level actions.',
        image: img('audiences/Audience 01.png'),
      },
      {
        slug: 'audiences-method-selection',
        module: 'audiences',
        title: 'Audience creation method',
        description:
          'Entry point for choosing how to define an audience, comparing precomputed, dynamic, and CSV-import based segmentation approaches.',
        image: img('audiences/Audience 02.png'),
      },
      {
        slug: 'audiences-precomputed-empty',
        module: 'audiences',
        title: 'Precomputed audience builder',
        description:
          'Initial precomputed audience setup with basic information, estimation controls, and the first segmentation rule group.',
        image: img('audiences/Audience 03.png'),
      },
      {
        slug: 'audiences-precomputed-filled',
        module: 'audiences',
        title: 'Precomputed audience with filters',
        description:
          'Expanded precomputed audience state showing multiple rule groups, tags, tiers, dates, and a live size estimate for richer segmentation logic.',
        image: img('audiences/Audience 04.png'),
      },
      {
        slug: 'audiences-dynamic-filled',
        module: 'audiences',
        title: 'Dynamic audience builder',
        description:
          'Runtime audience setup with available attributes for evaluation, including location, dates, tiers, tags, and member type conditions.',
        image: img('audiences/Audience 05.png'),
      },
      {
        slug: 'audiences-dynamic-empty',
        module: 'audiences',
        title: 'Dynamic audience empty state',
        description:
          'Blank dynamic audience state before any rule is added, emphasizing runtime evaluation behavior and the next action to define conditions.',
        image: img('audiences/Audience 06.png'),
      },
      {
        slug: 'audiences-csv-empty',
        module: 'audiences',
        title: 'CSV import audience empty state',
        description:
          'CSV-based audience setup with upload instructions, matching configuration, and an empty upload history for first-time imports.',
        image: img('audiences/Audience 07.png'),
      },
      {
        slug: 'audiences-csv-history',
        module: 'audiences',
        title: 'CSV import audience history',
        description:
          'CSV import workflow with populated upload history, file validation states, and matching configuration tied to the member database.',
        image: img('audiences/Audience 08.png'),
      },
    ],
  },
];

export const privateGalleryPassword =
  import.meta.env.VITE_PRIVATE_GALLERY_PASSWORD || 'profound-private';

export const privateProjects = localPrivateProjects;
