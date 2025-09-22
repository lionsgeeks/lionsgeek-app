<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8">
    <title>تذكير - البرمجة</title>
</head>
<body style="font-family: Arial; direction: rtl; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto;">
        
        <h1 style="color: #212529; text-align: center;">
            🖥️ Lions Geek - تخصص البرمجة
        </h1>
        
        <h2>مرحباً {{ $participant->full_name }}</h2>
        
        <p>نذكرك بأنه لم تقم بعد باختيار جلسة المعلومات لتخصص البرمجة.</p>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>💡 ماذا ستتعلم؟</h3>
            <ul>
                <li>تطوير مواقع الويب</li>
                <li>لغات البرمجة: PHP, JavaScript, React</li>
                <li>قواعد البيانات</li>
                <li>المشاريع العملية</li>
            </ul>
        </div>
        
        <h3>🗓️ الجلسات المتاحة:</h3>
        
        @forelse($availableSessions as $session)
            <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                <h4>{{ $session->name }}</h4>
                <p><strong>التاريخ:</strong> {{ $session->date->format('Y-m-d') }}</p>
                <p><strong>الوقت:</strong> {{ $session->time }}</p>
                <p><strong>المكان:</strong> {{ $session->location }}</p>
                
                <a href="{{ $selectionUrl }}?session={{ $session->id }}" 
                   style="background: #212529; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                    اختر هذه الجلسة
                </a>
            </div>
        @empty
            <p>لا توجد جلسات متاحة حالياً.</p>
        @endforelse
        
        <div style="background: #fff3cd; padding: 10px; border-radius: 5px; margin: 20px 0;">
            <p><strong>⚠️ مهم:</strong> يرجى الاختيار في أقرب وقت لضمان مكانك.</p>
        </div>
        
        <hr>
        <p><strong>فريق Lions Geek</strong><br>
        📧 info@lionsgeek.ma</p>
        
    </div>
</body>
</html>
