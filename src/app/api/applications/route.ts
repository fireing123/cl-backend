import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { transporter } from "@lib/email"
import ApiError from "@/lib/error/APIError";
import { auth } from "@/lib/authOptions";
import { CLemail, fullName } from "@/config";


export async function GET(req: Request) {
    const session = await auth();

    if (!session) {
        return ApiError({
            type: 'session',
            error: "로그인 필요"
        })
    }

    if (!isAdmin(session.user.rank)) {
        return ApiError({
            type: 'authority',
            error: "권한없음"
        })
    }

    const applications = await prisma.application.findMany()
    const applicationItems = applications.map((value) => {
        return {
            id: value.id,
            title: value.title,
            email: value.email,
            date: value.date
        }
    })

    const sortedApplications = applicationItems.sort((a, b) => b.date.getTime() - a.date.getTime())

    return NextResponse.json({
        type: true,
        applications: sortedApplications
    })

}

export async function POST(req: Request) {
    const { fileId, title, name, email, phoneNumber, fileData } = await req.json()

    if (!(fileId && title && email && phoneNumber && name)) {
        return ApiError({
            type: 'params',
            error: "값 결핍됨"
        })
    }
    
    const session = await auth();

    if (!session) {
        return ApiError({
            type: 'session',
            error: "로그인 필요"
        })
    }

    const application = await prisma.application.create({
        data: {
            title: title,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            fileId: fileId,
            user: {
                connect: {
                    email: session.user.email
                }
            }
        }
    })

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: "CL 동아리 신청서 사본",
        html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #f9f9f9;
        }
        .header {
            text-align: center;
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .content img {
            max-width: 100%;
            display: block;
            margin: 0 auto 20px;
        }
        .footer {
            padding: 10px;
            text-align: center;
            background-color: #4CAF50;
            color: white;
            border-radius: 0 0 10px 10px;
            font-size: 12px;
        }
        .business-info {
            text-align: left;
            margin-top: 20px;
            font-size: 12px;
            color: #555;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>신청서 사본 전달</h1>
        </div>
        <div class="content">
            <p>안녕하세요,</p>
            <p>아래는 신청서 사본입니다.</p>
            <p>추가 질문이 있으시면 언제든지 연락 주시기 바랍니다.</p>

            <p><strong>학번-이름:</strong>${application.name}</p>
            <p><strong>이메일:</strong>${application.email}</p>
            <p><strong>전화번호:</strong>${application.phoneNumber}</p>

            <p>
                ${fileData}
            </p>
        </div>
        <div class="business-info">
            <p><strong>동아리명:</strong>${fullName}</p>
            <p><strong>이메일:</strong>${CLemail}</p>
            <p><strong>주소:</strong>전북특별자치도 전주시 완산구 우전로 249</p>
        </div>
        <div class="footer">
            &copy; 2024 CL 동아리. All rights reserved.
        </div>
    </div>
</body>
</html>
`
    });

    return NextResponse.json({
        type: true,
        message: 'success'
    })
}


export async function PATCH(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id')!;
    const title = searchParams.get('title');
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const phoneNumber = searchParams.get('phoneNumber');
    
    if (!id) {
        return ApiError({
            type: 'params',
            error: "id 결핍"
        })
    }
    
    const session = await auth();

    if (!session) {
        return ApiError({
            type: 'session',
            error: "로그인하세요"
        })
    }

    const application = await prisma.application.findUnique({
        where: {
            id: id
        }
    })

    if (!application) {
        return ApiError({
            type: "params",
            error: "id 결핌"
        })
    }
    if (session.user.userId != application.userId) {
        return ApiError({
            type: 'authority',
            error: "본인 소유가 아닙니다"
        })
    }

    const data : any = {}
    if (title) data.title = title
    if (email) data.email = email
    if (name) data.name = name
    if (phoneNumber) data.phoneNumber = phoneNumber
    const patchApplication = await prisma.application.update({
        where: {
            id: id
        },
        data: data
    })
    return NextResponse.json({
        type: true,
        ...patchApplication
    })
}